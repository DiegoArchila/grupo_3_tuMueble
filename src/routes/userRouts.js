const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController.js");

router.get("/user/dashboard", userController.dashboard);

module.exports=router;