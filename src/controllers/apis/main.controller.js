const db = require('../../database/models');
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
            attributes: ["email", "id", "pwd", "isAdmin"],
            where: {
                "email":email 
            }
        });

        // Validating credentials, and if is admin or not
        if(user && (user.validPwd(pwd))) {
            
            //Gernerate token JWT
            const token= await createJWT(user.id);

            if(user.isAdmin==1){
                return await res.json({
                    msg:"Login exitoso, Admin Logeado",
                    "user": user,
                    "token": token 
                }).status(200);
            }
            return await res.json({
                msg:"Login exitoso, usuario Logeado",
                "user": user,
                "token": token 
            }).status(200);
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