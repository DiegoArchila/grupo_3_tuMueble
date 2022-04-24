//------------------------- Imports
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize({ dialect: "mysql" });

//------------------------- Init Model
const initModel = function () {

//------------------------- Settings

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
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
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
  const UserEmail = sequelize.define(alias, cols, config);

//------------------------- Relationship
  UserEmail.associate=(models)=>{

    /**
     * Email belongs to User
     */
    UserEmail.belongsTo(models.User,{
      as:"emailsUser",
      foreignKey:"userId"
    });

     /**
     * Email belongs to User
     */
      // UserEmail.belongsTo(models.EmailCategory,{
      //   as:"emailsCategory",
      //   foreignKey:"categoryId"
      // });
  }


  return UserEmail;
};

//------------------------- Return
module.exports = initModel;
