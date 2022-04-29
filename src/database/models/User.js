//------------------------- Settings
const User = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "User";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    dateBorn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model = sequelize.define(alias, cols, config);
  
  //------------------------- Relationship
  model.associate = function (models) {
    
    model.hasMany(models.UserPhone, {
      as: "phones",
      foreignKey: "genderId",
    });

    model.hasMany(models.UserEmail, {
      as: "emails",
      foreignKey: "userId",
    });

    model.belongsTo(models.UserGender, {
      as: "gender",
      foreignKey:"genderId"
    });

    model.hasMany(models.UserLocation, {
      as: "locations",
      foreignKey:"userId"
    });

  };

  //------------------------- Return
  return model;
  
};


module.exports = User;