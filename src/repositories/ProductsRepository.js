const Log = require("../lib/ConsoleLogs.js");
const db = require("../database/models/index.js");

/**
 * Request for get all products
 *
 * @return {*}  -All products
 */
let findAll = async () => {
  Log.consoleLogs(Log.LogsTypes.INFO, "Request for get all products");
  let allProducts = [];
  try {
    allProducts = await db.Product.findAll();
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }
  if (allProducts.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${allProducts.length} products have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${allProducts.length} products not found`
    );
  }

  return allProducts;
};

/**
 * Find one product by id
 *
 * @param {number} id    -Id of the product
 * @return {*} The product by id
 */
let findByPk = async (id) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one product by id: ${id}`
  );
  let product = {};
  try {
    product = await db.Product.findByPk(id);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (product) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `product has been found: ${product}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `product not found`);
  }

  return product;
};

/**
 * All products by category
 *
 * @param {number} categoryId -Id of the category
 * @return {*}  - All products by category
 */
const findAllByCategory = async (categoryId) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for get all products by category id: " + categoryId
  );
  let allProducts = [];
  try {
    allProducts = await db.Product.findAll({
      where: { categoryId: categoryId },
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }
  if (allProducts.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${allProducts.length} products have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${allProducts.length} products not found`
    );
  }

  return allProducts;
};

/**
 * Update product by id
 *
 * @param {number} productId  -Product id
 * @param {*} product -Update data
 * @return {*} -Product update
 */
const update = async (productId, product) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for update product by id: " + productId
  );
  let productUpdate = {};
  try {
    productUpdate = await db.Product.update(product, {
      where: { id: productId },
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productUpdate) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `product has been update: ${productUpdate}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `product not update`);
  }

  return productUpdate;
};

module.exports = {
  findAll,
  findByPk,
  findAllByCategory,
  update,
};
