/* Imports */
const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/apis/ProductsController.js");

//Imagen principal del producto
let saveProductImages = imageSaver.saveImages("public/img/store/products");

const urlProducts = "/api/products";

//All products
router.get(`${urlProducts}`, productsController.findAll);

//Product detail
router.get(`${urlProducts}/detail/:id`, productsController.findProduct);

//Products by category
router.get(
  `${urlProducts}/category/:categoryId`,
  productsController.findProductsByCategory
);

//Edit a product
router.post(`${urlProducts}/edit/:id`, productsController.updateProduct);

//Delete a product
router.post(`${urlProducts}/delete/:id`, productsController.deleteProduct);

//Create a product
router.post(
  `${urlProducts}/create`,
  saveProductImages.single("imageMain"),
  productsController.createProduct
);

module.exports = router;
