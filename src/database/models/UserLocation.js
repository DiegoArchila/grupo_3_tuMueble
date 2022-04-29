//------------------------- Settings
const UserLocation = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "UserPhone";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    provinceState: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    cityTown: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    addressLine: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(250),
    },
    isMain: {
      type: DataTypes.TINYINT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "usersLocations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model = sequelize.define(alias, cols, config);

  //------------------------- Relationship
  model.associations = function (models) {
    
    model.belongsTo(models.User, {
      as: "locations",
      foreignKey: "userId",
    });

  };

  //------------------------- Return
  return model;

};


module.exports = UserLocation;
