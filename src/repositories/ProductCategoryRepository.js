const db = require("../database/models/index.js");
const Log = require("../lib/ConsoleLogs.js");

/**
 * Find all products Categories
 *
 * @param {{}} params -Params with conditions
 * @return {*} categories   -All categories
 */
const findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get all productsCategory` +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let categories = [];
  try {
    categories = await db.ProductCategory.findAll({
      ...params,
    });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (categories.length > 0) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `${categories.length} productsCategory have been found`
    );
  } else {
    Log.consoleLogs(
      Log.LogsTypes.WARM,
      `${categories.length} productsCategory not found`
    );
  }

  return categories;
};

/**
 * Find one productCategory by id
 *
 * @param {number} id    -Id of the productCategory
 * @param {{}} params -Params with conditions
 * @return {*} The productCategory by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one productCategory by id: ${id}` +
      (params ? ` and by: ${JSON.stringify(params)}` : "")
  );
  let productCategory = {};
  try {
    productCategory = await db.ProductCategory.findByPk(id, { ...params });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  if (productCategory) {
    Log.consoleLogs(
      Log.LogsTypes.SUCCESS,
      `productCategory has been found: ${productCategory}`
    );
  } else {
    Log.consoleLogs(Log.LogsTypes.WARM, `productCategory not found`);
  }

  return productCategory;
};

module.exports = {
  findAll,
  findByPk,
};
