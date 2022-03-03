const settingGeneral = require("../databases/settingGeneralSite.json");
const index = require("../databases/index.json");
const products = require("../databases/business/products.json");
const categories = require("../databases/business/productsCategories.json");
/** Format the price to currency COP
 */
const { toCOP } = require("../lib/formats.js");

const { validationResult } = require("express-validator");

const functions = require("../lib/functions.js");

//All products
const viewAllProducts = (req, res) => {
  return res.render("../views/products.ejs", {
    settingGeneral,
    index,
    products: products.sort((a, b) => b.buyes - a.buyes),
    toCOP,
  });
};

//Products by category
const viewProductsByCategory = (req, res) => {
  let categoryId = req.params.categoryId ? req.params.categoryId : null;
  let productsResponse = products;

  if (categoryId) {
    //Filtro por categorias
    let category = categories.find((category) => category.id == categoryId);
    if (category && category.name) {
      productsResponse = products
        .filter((product) => product.category == category.name)
        .sort((a, b) => b.buyes - a.buyes);
    }
  }

  return res.render("../views/products.ejs", {
    settingGeneral,
    index,
    products: productsResponse,
    categories,
    toCOP,
  });
};

const detailProduct = async (req, res) => {
  let id = req.params.id;
  let product = products.find((product) => product.id == id);
  if (product) {
    return res.render("../views/productDetail.ejs", {
      settingGeneral,
      index,
      product,
      toCOP,
    });
  }
};

module.exports = {
  viewAllProducts,
  viewProductsByCategory,
  detailProduct,
};
