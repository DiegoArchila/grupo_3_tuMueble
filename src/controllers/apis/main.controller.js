const { tableName } = require('sequelize/lib/model');
const db = require('../../database/models');
const UserEmail = require('../../database/models/UserEmail');
const { createJWT } = require('../../lib/formats.js');

const mainController = {};

/**
 * Authenticate users
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns JSON with Response HTTP[S]
 */
mainController.login= async (req,res) => {

    const { email, pwd } = req.body;

    try {

        // The user Exists?
        const user = await db.User.findOne({
            include: [{
                model:db.UserEmail,
                as: "emails",
                where:{
                    "email":email
                },
                include: [{
                    model:db.EmailCategory,
                    as: "category",
                    attributes:["category"]
                }],
                attributes : ["email"]       
            }],
            attributes:["pwd","isAdmin"]
        });

        //Validating credentials, and if is admin or not
        if(user && (user.validPwd(pwd))) {
            
            //Gernerate token JWT
            const token= await createJWT(user.id);
            
            //Assign Token To headers
            res.setHeader("Auth",token);

            if(user.isAdmin==1){

                //Assign Role Admin to Headers
                res.setHeader("Role-User","admin");

                //Redirect page Home
                return await res
                    .status(200)
                    .setHeader("Role-User","admin")
                    .redirect("/api/admin/dashboard");
            }

            //Assign Role User to Headers
            res.setHeader("Role-User","user");

            //Redirect page Home
            return await res.status(200).redirect("/api/");
            

        } else {
            return res.json({
                msg:"Usuario o contraseña incorrecta"
            }).status(400);
        }
    
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            description: "Comuniquese con el Administrador (Internal Error 500)"
        });
    }

}


module.exports=mainController;