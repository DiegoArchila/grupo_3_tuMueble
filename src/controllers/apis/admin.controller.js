const { createJWT } = require('../../lib/formats.js');
const db =require("../../database/models");
const { user } = require('../adminController.js');
const { use } = require('bcrypt/promises');

const admin = {};

/**
 * Validate User Login
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
admin.login=async (req,res) =>{

    const users= await db.User.findAll();

    res.json({
        status:200,
        info: users
})

}

module.exports= admin;