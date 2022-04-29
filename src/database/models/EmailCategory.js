//------------------------- Settings
const EmailCategory = (sequelize, DataTypes) => {

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
    category: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING(250),
    },
    created_at: DataTypes.TIMESTAMP,
    updated_at: DataTypes.TIMESTAMP
    
  };

  //Sets configurations the from model or table
  const config = {
    tableName: "emailsCategory",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  //------------------------- Asignation
  const model=sequelize.define(alias, cols, config);

  //------------------------- Relationship
  model.associate=function(models) {
    
    model.hasMany(models.UserEmail, {
      as: "category",
      foreignKey:"categoryId"
    });
    
  }
  
  //------------------------- Return
  return model;

};

module.exports = EmailCategory;