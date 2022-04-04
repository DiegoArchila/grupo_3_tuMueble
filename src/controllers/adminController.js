const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;
const products = require("../databases/business/products.json");
const orders = require("../databases/business/orders.json");

/**Index contain information from title the page.
 *
 * index {
 *  name: name of the project
 *  title: title of the page
 * }
 */
const index = require("../databases/index.json");

/**settingGeneralSite contain information from the struct of the head.
 *
 * settingGeneralSite {
 *  languaje: lanjuaje of the site (See the settingGeneralSite.json)
 *  title: title of the page
 * }
 */
const settingGeneral = require("../databases/settingGeneralSite.json");

/** Format the price to currency COP
 */
const { toCOP } = require("../lib/formats.js");

/**MiniBanner
 * For more information see /wiews/partials/miniBanner.ejs
 */
minibar = {
  title: "Admin Principal",
  icon: "eos-icons:admin-outlined",
};

module.exports = {
  admin: (req, res) => {
    res.render("./admin/index.ejs", {
      index,
      settingGeneral,
      toCOP,
      minibar,
      orders,
    });
  },
  products: async (req, res) => {
    let products = [];
    try {
      products = await db.Product.findAll({ order: [["productName", "ASC"]] });
    } catch (error) {
      console.error(error);
      throw error;
    }
    res.render("./admin/products.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
      products,
    });
  },
  createProduct: async (req, res) => {
    let categories = [];
    let taxes = [];
    try {
      categories = await db.ProductCategory.findAll({
        order: [["category", "ASC"]],
      });
      taxes = await db.Tax.findAll({
        where: { isActive: 1 },
        order: [["taxeName", "ASC"]],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    res.render("./admin/createProduct.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
      categories,
      taxes,
    });
  },
  createProductPost: (req, res) => {
    let body = req.body;
    res.json(body);
  },
  user: (req, res) => {
    res.render("./admin/adminUser.ejs", {
      index,
      settingGeneral,
      minibar,
    });
  },
};
