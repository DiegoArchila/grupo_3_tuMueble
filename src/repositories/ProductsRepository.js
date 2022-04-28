const Log = require("../lib/ConsoleLogs.js");
const db = require("../database/models/index.js");

/** Include childs on the product */
const include = [
  {
    as: "category",
    model: db.ProductCategory,
  },
  {
    as: "images",
    model: db.ProductImages,
  },
];

/**
 * Request for get all products
 *
 * @param {{}} params -Params like where conditions, order, etc.
 * @return {*}  -All products
 */
let findAll = async (params = null) => {
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    "Request for get all products" +
      (params ? ` by: ${JSON.stringify(params)}` : "")
  );
  let allProducts = [];
  try {
    allProducts = await db.Product.findAll({
      include,
      ...params,
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
 * Find one product by id
 *
 * @param {number} id    -Id of the product
 * @param {{}} params -Params with conditions
 * @return {*} The product by id
 */
let findByPk = async (id, params = null) => {
  if (!id) {
    Log.consoleLogs(Log.LogsTypes.ERR, "The id is null");
    return null;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for get one product by id: ${id}` +
      (params ? `and by: ${JSON.stringify(params)}` : "")
  );
  let product = {};
  try {
    product = await db.Product.findByPk(id, {
      include,
      ...params,
    });
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

/**
 * Delete a Product by where condition
 *
 * @param {*} where -The where condition for the delete
 * @return {boolean}  -Return true if the delete was success
 */
const deleteWhere = async (where) => {
  if (!where) {
    Log.consoleLogs(Log.LogsTypes.ERR, "Specify a where condicion for delete");
    return false;
  }
  Log.consoleLogs(
    Log.LogsTypes.INFO,
    `Request for delete Product where: ${where}`
  );

  try {
    await db.Product.destroy({ where });
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The Product was delete`);

  return true;
};

/**
 * Create a product
 *
 * @param {*} producto  -Product to create
 * @return {*} -The new product
 */
const create = async (producto) => {
  if (!producto) {
    Log.consoleLogs(Log.LogsTypes.ERR, "No data for create a product");
    return null;
  }
  let newProducto = {};
  Log.consoleLogs(Log.LogsTypes.INFO, `Request for create Product`);
  try {
    newProducto = await db.Product.create(producto);
  } catch (error) {
    Log.consoleLogs(Log.LogsTypes.ERR, error);
    throw error;
  }

  Log.consoleLogs(Log.LogsTypes.SUCCESS, `The Product was create`);

  return newProducto;
};

module.exports = {
  findAll,
  findByPk,
  update,
  deleteWhere,
  create,
};
