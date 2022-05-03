/*IMPORTS*/
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

/**Format the numbers to format currency,
 * this to COP=Colombian PESO Money
 * 
 */
const toCOP= new Intl.NumberFormat("es-CO", {
    style:"currency",
    currency:"COP",
    minimumFractionDigits:0
});

/**
 * Convert JSON in Object
 * @param {JSON} json Object in format JSON 
 * @returns A Object at format Object
 */
const toObject = (json) =>{
    console.log("ToObject", json, "\n ruta actual:", path.resolve(__dirname,json));
    return JSON.parse( fs.readFileSync(path.resolve(__dirname,json), "utf-8") );
}

/**
 * Create a file type JSON
 * @param {Object} Obj Object to convert
 * @param {String} path Path of the file name to create 
 */
const createJSON = (Obj, pathRoute) =>{
    fs.writeFileSync(path.resolve(__dirname,pathRoute), JSON.stringify(Obj, null, " "));
}

/**
 * Encrypt passwords
 * @param {String} pwd text of the password to encrypt
 * @returns password encrypted
 */
const encrypt = (pwd) => {
    let salt=12;
    return bcrypt.hashSync(pwd,salt);
}

/**
 * Compared encrypt passwords with password text
 * @param {*} pwd text of the password to compare
 * @returns true if the comparation is true, or false if don't
 */
const comparePassword = (pwd, pwdEncrypted) => {
    return bcrypt.compareSync(pwd,pwdEncrypted);
}

// const createJWT()


module.exports={
    toCOP,
    toObject,
    createJSON,
    encrypt,
    comparePassword
}