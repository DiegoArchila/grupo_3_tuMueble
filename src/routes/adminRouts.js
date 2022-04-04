/* Imports */
const express = require("express");
const router = express.Router();
const imageSaver = require("../lib/imageSaver.js");

const adminController = require("../controllers/adminController.js");

//Imagen principal del producto
let saveMainImage = imageSaver.saveOneImage("public/img/store/products");

router.get("/admin", adminController.admin);

/**
 * Admin User
 */
router.get("/admin/user", adminController.user);
router.post("/admin/user", adminController.user);

/**
 * Admin Products
 */
router.get("/admin/products", adminController.products);
router.get("/admin/products/create", adminController.createProduct);
router.post(
  "/admin/products/create",
  saveMainImage.single("imageMain"),
  adminController.createProductPost
);

module.exports = router;
