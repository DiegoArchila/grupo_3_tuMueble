//------------------------- Settings
const UserGender = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserGender";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersGender",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  model.associate = function(models) {

    model.hasMany(models.User, {
      as: "gender",
      foreignKey: "genderId"
    });

  }

  //------------------------- Return
  return model;
};

module.exports = UserGender;