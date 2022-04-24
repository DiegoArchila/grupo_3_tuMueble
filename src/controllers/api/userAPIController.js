const db = require("../../database/models/index.js");

const userAPIController= {
    createGender : async (req, res) =>{
        await db.UserGender.create({
            "gender": req.body.gender,
            "notes": req.body.notes
        });
    }

}

module.exports=userAPIController;