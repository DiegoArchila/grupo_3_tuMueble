//------------------------- Settings
module.exports = (sequelize, DataTypes) => {
  
    //Set the Alias
    const alias = "Cart";
  
    //Sets the columns
    const cols = {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      total: {
        type: DataTypes.BIGINT,
        allowNull:false
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    };
  
    //Sets configurations the from model or table
    const config = {
      tableName: "carts",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: false,
    };
  
    //------------------------- Asignation
    const Cart = sequelize.define(alias, cols, config);
    
    //------------------------- Relationship
    Cart.associate = function (models) {
      
      
  
    };
  
    //------------------------- Return
    return Cart;
    
  };