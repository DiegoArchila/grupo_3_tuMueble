/*IMPORTS*/
const users = "../databases/business/users.json";
const { toObject, createJSON, encrypt, comparePassword } = require("../lib/formats.js");
const db =require("../database/models/");
const User = db.User;


/*FUNCTIONS*/
const getData = () => {
    return toObject(users);
}

const getAlls = () => {
    return getData();
}

/**
 * Found user by Primary Key or ID
 * @param {*} id 
 * @returns User found
 */
const findByPk = async(id) =>{
    let user= await User.findByPk(id);
    return user;
}

/**
 * function for verifiqued if a user is registred, this for email
 * @param {*} email 
 * @returns true if the email is found or false if do is not
 */
const findByEmail = (email) =>{
    let allsUsers=getAlls();
    let user=allsUsers.find(u=>u.email===email);
    return (user!=undefined) ? true:false;
}

/**
 * Search a user by field
 * @param {*} field field or property of user
 * @param {*} text text from field to compare
 * @returns object user 
 */
const findByField = (field, text) =>{
  
        let allsUsers=getAlls();
        let userField=allsUsers.find(u=>u[field]===text);

        return userField;   

}

const getNewId=()=>{
    
    let allsUsers=getAlls();
    let lastID = allsUsers.pop();
    let index=0

    if (lastID!=undefined) {
        index=(lastID.id + 1)  
    }

    return index; 
}


/**
 * Validated if the user is admin
 * @param {Object} user Object user expected
 * @returns true if the user is admin, or a object error in case negative. 
 */
const update = async (user)=>{

    let allsUsers=getAlls();
    allsUsers[user.id]=user;

    createJSON(allsUsers,users);

    if(user==allsUsers[user.id]) {
        return true;
    } else {
        throw new Error("No se ha podido modificar el usuario", user.email)
    }    
}

/**
 * Validated if the user is admin
 * @param {Object} user Object user expected
 * @returns true if the user is admin, or a object error in case negative. 
 */
const isAdmin= async(id) => {
    try {
        let user=findByPk(id); 
        if(user=undefined && user.isAdmin!=undefined && user.isAdmin===true){
            return true;
        } else{
            return false;
        }
    } catch (error) {
        throw error;
    }
}

/**
 * create user
 * @param {Object} user Object with structs from user to create 
 * @returns true if of user is created, or a object error in case negative.
 */
const create = (user, imagen)=>{
    try {

        let allsUsers=getAlls();
    
        user.id=getNewId();
        user.password=encrypt(user.password);
        user.passwordTry=undefined;
        
        user.imagen=undefined;
        if(imagen!=null){
            user.imagen=imagen
        }
        
        allsUsers.push(user);

        createJSON(allsUsers,users);

        user=findByPk(getNewId()-1);
        
        if (user!=undefined) {
            return true;
        } else {
            throw new Error("Ha ocurrido un error al crear el usuario");
        }

    } catch (error) {
        throw error;
    }
    
}


/**
 * Validate if the password is great.
 * First validate the email, before the password
 * @param {*} inputEmail identifiquer of the user 
 * @param {*} password password ingresed
 */
const validateUser = (inputEmail, password) =>{

    let user= User.findAll({
        where: {
            email:inputEmail
        }
    });

    if(user!=undefined &&
        (user.email===inputEmail && 
        comparePassword(password, user.password))){
            return true;
    } else{
            return false;
    }
};


/**
 * search a user by email
 * @param {*} email email of the user
 * @returns Object user, if is found
 */
const getUserByEmail=async(email)=>{
    try {
        let allsUsers=getAlls();
        let user=allsUsers.find(u=>u.email===email);
        return user;
    } catch (error) {
        throw error;
    }
}



module.exports= {
    getAlls,
    findByEmail,
    findByPk,
    findByField,
    update,
    create,
    isAdmin,
    validateUser,
    getUserByEmail    
}