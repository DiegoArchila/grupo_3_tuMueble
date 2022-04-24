/* Imports */
const express = require("express");
const router = express.Router();
const imageSaver = require("../lib/imageSaver.js");

const adminController = require("../controllers/adminController.js");
const { validateUserAdmin } = require("../middleWares/adminMiddleware.js");

const userAPIController = require("../controllers/api/userAPIController.js")
//Imagen principal del producto
let saveProductImages = imageSaver.saveImages("public/img/store/products");


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
// router.get("/admin/products/create", validateUserAdmin, adminController.createProduct);
// router.post("/admin/products/create", validateUserAdmin, adminController.createProduct);
router.get("/admin/products/edit/:id", validateUserAdmin,adminController.editProductView);
router.post("/admin/products/edit/:id", validateUserAdmin,adminController.editProduct);
router.post("/admin/products/delete/:id", validateUserAdmin,adminController.deleteProduct);
router.get("/admin/products/create", validateUserAdmin,adminController.createProduct);
router.post(
  "/admin/products/create",
  saveProductImages.single("imageMain"),
  adminController.createProductPost
);

/**
 * Admin Components
 */
 router.get("/admin/components", validateUserAdmin, adminController.components);

 /**
 * Admin Users Gender
 */
  router.get("/admin/users/genders/create", validateUserAdmin,userAPIController.createGender);

module.exports = router;