//------------------------- Settings
const UserEmail = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserEmail";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersEmails",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  model.associate = function (models) {
    
    model.belongsTo(models.EmailCategory, {
      as: "category",
      foreignKey: "categoryId",
    });

    model.belongsTo(models.User, {
      as: "emails",
      foreignKey: "userId",
    });
  };

  //------------------------- Return
  return model;

};

module.exports = UserEmail;