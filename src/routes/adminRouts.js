/* Imports */
const express=require("express");
const router=express.Router();

const adminController = require("../controllers/adminController.js");
const { validateUserAdmin } = require("../middleWares/adminMiddleware.js");

const userAPIController = require("../controllers/api/userAPIController.js")


router.get("/admin/dashboard", validateUserAdmin, adminController.admin);

/**
 * Admin User
 */
router.get("/admin/user", validateUserAdmin, adminController.user);
router.post("/admin/user", validateUserAdmin, adminController.user);

/**
 * Admin Products
 */
router.get("/admin/products", validateUserAdmin, adminController.products);
router.get("/admin/products/create", validateUserAdmin, adminController.createProduct);
router.post("/admin/products/create", validateUserAdmin, adminController.createProduct);

/**
 * Admin Components
 */
 router.get("/admin/components", validateUserAdmin, adminController.components);

 /**
 * Admin Users Gender
 */
  router.get("/admin/users/genders/create", userAPIController.createGender);



module.exports=router;
