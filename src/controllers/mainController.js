const products = require("../databases/business/products.json");
var { minibar, index, settingGeneral } = require("../lib/complements.js");
const { create, getUserByEmail } = require("../models/users.js");
const { toCOP } = require("../lib/formats.js");
const categories = require("../databases/business/productsCategories.json");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

const functions = require("../lib/functions.js");

// const home = async (req, res) => {
//   try {
//     if (req.session.user != undefined) {
//       await res.render("index.ejs", {
//         settingGeneral,
//         index,
//         toCOP,
//         productsMasComprados,
//         productsOfertas,
//         categories,
//         user: req.session.user,
//         admin: req.session.admin,
//       });
//     } else {
//       await res.render("index.ejs", {
//         settingGeneral,
//         index,
//         toCOP,
//         productsMasComprados,
//         productsOfertas,
//         categories,
//       });
//     }
//   }
// } 





const home = async (req, res) => {
  index.title = "home";

  let productsMasComprados = []; /*functions.recortarTamanioDeUnArreglo(
    [...products].sort((a, b) => b.buyes - a.buyes), //Se ordenan por productos mas comprados
    3 //Cantidad de sliders a mostrar
  );*/

  let productsOfertas = []; /*functions.recortarTamanioDeUnArreglo(
    [...products]
      .map((product) => {
        if (product.discount > 0) {
          return product;
        }
      })
      .sort((a, b) => b.discount - a.discount), //Productos con ofertas de mayor a menor
    3 //Cantidad de sliders a mostrar
  );*/
  let categories = [];
  let mainImages = [];
  let idProducts = [];

  try {
    productsMasComprados = await db.Product.findAll({
      order: [["unitsSelled", "ASC"]],
      limit: 3,
    });
    idProducts = productsMasComprados.map((product) => {
      return product.id;
    });

    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
      },
    });

    productsMasComprados.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });

    productsOfertas = await db.Product.findAll({
      where: { discount: { [Op.gt]: 0 } },
      order: [["discount", "ASC"]],
      limit: 3,
    });
    idProducts = productsOfertas.map((product) => {
      return product.id;
    });

    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
      },
    });

    productsOfertas.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });
    categories = await db.ProductCategory.findAll();
  } catch (error) {
    console.error(error);
    throw error;
  }

  try {
    await res.render("index.ejs", {
      settingGeneral,
      index,
      productsMasComprados,
      productsOfertas,
      categories,
      toCOP,
    });
  } catch (error) {
    throw error;
  }
};

const login = async (req, res) => {
  try {
    if (req.session.user != undefined) {
      return await res.render("index.ejs", {
        settingGeneral,
        index,
        minibar,
        user: req.session.user,
        admin: req.session.admin,
      });
    } else {
      await res.render("login.ejs", {
        settingGeneral,
        index,
        minibar,
      });
    }
  } catch (error) {
    throw error;
  }
};

const createUser = async (req, res) => {
  let imagen=(req.file) ? req.file.filename : null;
  try {
    create(req.body,imagen);
    await res.redirect("/login");
  } catch (error) {
    throw error;
  }
};

const showCreateUser = async (req, res) => {
  try {
    if (req.session.user != undefined) {
      await res.render("index.ejs", {
        settingGeneral,
        index,
        minibar,
        user: req.session.user,
        admin:req.session.admin
      });
    } else {
      res.render("createUser.ejs", {
        settingGeneral,
        index,
        minibar,
      });
    }
  } catch (error) {
    throw error;
  }
};

const validateUser = async (req, res) => {
  try {
    let user = await getUserByEmail(req.body.email);
    req.session.user = user.id;

    if (user.isAdmin) {
      req.session.admin = true;
    }
  } catch (error) {
    throw error;
  } finally {
    res.redirect("/");
  }
};

/**
 * Close Session user
 * @param {*} req
 * @param {*} res
 */
const logout = async (req, res) => {
  req.session.user = undefined;
  req.session.admin = undefined;
  res.redirect("/");
};

module.exports = {
  home,
  login,
  showCreateUser,
  createUser,
  validateUser,
  logout
};
