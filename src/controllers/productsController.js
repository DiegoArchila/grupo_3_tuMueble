const settingGeneral = require("../databases/settingGeneralSite.json");
const index = require("../databases/index.json");
const db = require("../database/models/index.js");
const products = require("../databases/business/products.json");
const categories = require("../databases/business/productsCategories.json");
/** Format the price to currency COP
 */
const { toCOP } = require("../lib/formats.js");

const { validationResult } = require("express-validator");

const functions = require("../lib/functions.js");

//All products
const viewAllProducts = async (req, res) => {
  let allProducts = [];
  try {
    allProducts = await db.Product.findAll(/*{
      include: [
        {
          association: db.ProductCategory,
          as: "category",
        },
      ],
    }*/);
  } catch (error) {
    console.error(error);
    throw error;
  }
  console.log(allProducts);
  return res.render("../views/products.ejs", {
    settingGeneral,
    index,
    products: allProducts, //products.sort((a, b) => b.buyes - a.buyes),
    toCOP,
  });
};

//Products by category
const viewProductsByCategory = async (req, res) => {
  let categoryId = req.params.categoryId ? req.params.categoryId : null;
  let productsResponse = []; //products;
  let categories = [];

  if (categoryId) {
    //Filtro por categorias
    let category = {};
    try {
      category = await db.ProductCategory.findByPk(categoryId); //categories.find((category) => category.id == categoryId);
    } catch (error) {
      console.error(error);
      throw error;
    }
    if (category && category.category) {
      try {
        productsResponse = await db.Product.findAll({
          where: { categoryId: categoryId },
        }); /*products
        .filter((product) => product.category == category.name)
        .sort((a, b) => b.buyes - a.buyes); */
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    try {
      categories = await db.ProductCategory.findAll();
    } catch (error) {
      console.error(error);
      throw error;
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
  let product = {}; //products.find((product) => product.id == id);
  try {
    product = await db.Product.findByPk(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
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
