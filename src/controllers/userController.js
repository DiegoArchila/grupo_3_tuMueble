const { minibar, index, settingGeneral } =require("../lib/complements.js");
const userOrders=require("../databases/business/usersOrders.json");
const { toCOP } = require("../lib/formats.js");
const db =require("../database/models/");
const { findByPk } = require("../models/users.js");
const User = db.User;
module.exports={
    dashboard:async(req,res) =>{
        try {
          const userData= await findByPk(req.session.user)
            await res.render("./user/index.ejs", {
                minibar,
                settingGeneral,
                index,
                orders:userOrders,
                toCOP,
                user:req.session.user,
                admin:req.session.admin,
                userData
            });
        } catch (error) {
            throw error;
        }
    },
    user: async(req, res) => {
        try {
          const userData= await findByPk(req.session.user);
        return await res.render("./user/user.ejs", {
          index,
          settingGeneral,
          minibar,
          user:req.session.user,
          admin:req.session.admin,
          userData
        });  
        } catch (error) {
          throw error;
        }
        
      }
}