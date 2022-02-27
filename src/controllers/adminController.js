const products=require("../databases/business/products.json");
const orders=require("../databases/business/orders.json");

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
 const {toCOP} =require("../lib/formats.js");

/**MiniBanner
* For more information see /wiews/partials/miniBanner.ejs
*/
minibar = {
  title: "Admin Principal",
  icon: "eos-icons:admin-outlined",
}

module.exports = {
  admin: (req, res) => {
    res.render("./admin/index.ejs", {
      index,
      settingGeneral,
      toCOP,
      minibar,
      orders
    });
  },
  products: (req, res) => {
    res.render("./admin/products.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
      products
    });
  },
  createProduct: (req, res) => {
    res.render("./admin/createProduct.ejs", {
      index,
      settingGeneral,
      minibar,
      toCOP,
    });
  },
  user: (req, res) => {
    res.render("./admin/adminUser.ejs", {
      index,
      settingGeneral,
      minibar,
    });
  },
};
