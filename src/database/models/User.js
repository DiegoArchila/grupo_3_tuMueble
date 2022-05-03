const bcrypt = require("bcrypt");

/**
 * User model representation
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataType} DataTypes 
 * @returns Sequelize User model
 */
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
    isAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0      
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
    hooks:{
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(12);
        user.pwd= await bcrypt.hash(user.pwd, salt);
      }
    }
  };

  /**
   * Function to compare PWD
   * @param {this.pwd} pwd 
   * @returns 
   */
  User.prototype.validPwd= async function (pwd) {
    return await bcrypt.compare(pwd, this.pwd);
  }

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

    User.hasMany(models.UserCart, {
      as: "cartsUsers",
      foreignKey: "userId"
    });

    User.hasMany(models.Cart, {
      as: "userCarts",
      foreignKey: "userId"
    });

  };

  //------------------------- Return
  return User;
  
};