//------------------------- Settings
module.exports = (sequelize, DataTypes) => {
  
  //Set the Alias
  const alias = "User";

  //Sets the columns
  const cols = {
    id: {
      type: DataTypes.INTEGER,
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
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
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
  const User = sequelize.define(alias, cols, config);
  
  //------------------------- Relationship
  User.associate = function (models) {
    
    User.hasMany(models.UserPhone, {
      as: "phones",
      foreignKey: "genderId",
    });

    User.hasMany(models.UserEmail, {
      as: "emails",
      foreignKey: "userId",
    });

    User.belongsTo(models.UserGender, {
      as: "genders",
      foreignKey:"genderId"
    });

    User.hasMany(models.UserLocation, {
      as: "locations",
      foreignKey:"userId"
    });

  };

  //------------------------- Return
  return User;
  
};