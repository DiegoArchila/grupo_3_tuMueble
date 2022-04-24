/* Imports */
const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/apis/ProductsController.js");

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

module.exports = router;
