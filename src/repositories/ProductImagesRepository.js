const Log = require("../lib/ConsoleLogs.js");
const db = require("../database/models/index.js");
const Op = db.Sequelize.Op;

/**
 * Request for get all productsImages
 *
 * @return {*} all productsImages
 */
let findAll = async () => {
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for get all productsImages`);
  let allProductImages = [];
  try {
    allProductImages = await db.ProductImages.findAll();
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (allProductImages.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${allProductImages.length} productImages have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${allProductImages.length} productImages not found`
    );
  }

  return allProductImages;
};

/**
 * Find one productImage by id
 *
 * @param {number} id    -Id of the productImage
 * @return {*} The productImage by id
 */
let findByPk = async (id) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one productImage by id: ${id}`
  );
  let productImage = {};
  try {
    productImage = await db.ProductImages.findByPk(id);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productImage.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `productImage has been found: ${productImage}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productImage not found`);
  }

  return productImage;
};

/**
 * Request for get all productsImages by idProducts and isMain
 *
 * @param {[number]} idProducts
 * @param {boolean} isMain
 * @return {*} mainImages by idProducts and isMain
 */
let findAllByIdProductsAndIsMain = async (idProducts, isMain) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all productsImages by idProducts: ${idProducts} and isMain: ${isMain}`
  );
  let mainImages = [];
  try {
    mainImages = await db.ProductImages.findAll({
      where: {
        productId: { [Op.in]: idProducts },
        isMain,
      },
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (mainImages.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${mainImages.length} mainImages have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${mainImages.length} mainImages not found`
    );
  }

  return mainImages;
};

/**
 * Request for get all productsImages by idProduct and order by isMain
 *
 * @param {number} idProduct  -Id of the product
 * @return {*} productImages  -Images of the product
 */
const findAllByProductIdOrderByIsMain = async (idProduct) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all productsImages by idProduct: ${idProduct} and order by isMain`
  );
  let productImages = [];
  try {
    productImages = await db.ProductImages.findAll({
      where: { productId: idProduct },
      order: [["isMain", "DESC"]],
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productImages.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${productImages.length} images have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${productImages.length} images not found`
    );
  }

  return productImages;
};

module.exports = {
  findAll,
  findAllByIdProductsAndIsMain,
  findByPk,
  findAllByProductIdOrderByIsMain,
};
