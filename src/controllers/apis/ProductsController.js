const productsService = require("../../services/ProductsService.js");
const ApiFormats = require("../../lib/ApiFormats.js");

/**
 * Return all products
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products and aditional api data
 */
const findAll = async (req, res) => {
  let allProducts = [];
  let response = [];

  allProducts = await productsService.findAllWithMainImage();

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, allProducts);

  return res.status(response.status).json(response);
};

/**
 * Return a product by id
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products and aditional api data
 */
const findProduct = async (req, res) => {
  let product = {};
  let response = [];
  let idProduct = req.params.id;

  if (!idProduct) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  product = await productsService.findProductWithImages(idProduct);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, product);

  return res.status(response.status).json(response);
};

/**
 * Return all products by category
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with all the products by category and aditional api data
 */
const findProductsByCategory = async (req, res) => {
  let categoryId = req.params.categoryId ? req.params.categoryId : null;
  let productsResponse = [];
  let response = [];

  if (!categoryId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  productsResponse = await productsService.findAllProductsByCategory(
    categoryId
  );

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productsResponse);

  return res.status(response.status).json(response);
};

/**
 * Return product update
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} response  -Json with the product update and aditional api data
 */
const updateProduct = async (req, res) => {
  let productId = req.params.id;
  let response = [];
  let productUpdate = {};
  let body = req.body;

  if (!productId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  productUpdate = await productsService.updateProduct(productId, body);

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productUpdate);

  return res.status(response.status).json(response);
};

/**
 * Delete product
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} Status
 */
const deleteProduct = async (req, res) => {
  let productId = req.params.id;
  let response = [];
  let deleteSuccess = false;

  if (!productId) {
    return res
      .status(ApiFormats.ApiStatus.NOT_FOUND.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.NOT_FOUND));
  }

  deleteSuccess = await productsService.deleteProduct(productId);

  if (!deleteSuccess) {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST);
  } else {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK);
  }

  return res.status(response.status).json(response);
};

/**
 * Create product
 *
 * @param {*} req   - is an object containing information about the HTTP request that raised the event
 * @param {*} res   - to send back the desired HTTP response
 * @return {*} Status
 */
const createProduct = async (req, res, next) => {
  let body = req.body;
  let file = req.file;
  let response = [];
  let producto = {};
  let newProducto = {};

  if (!file) {
    const error = new Error("Por favor seleccione un archivo");
    error.httpStatusCode = 400;
    return next(error);
  }

  if (!body) {
    return res
      .status(ApiFormats.ApiStatus.BAD_REQUEST.code)
      .json(ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST));
  }

  producto = {
    productName: body.productName,
    productDescription: body.productDescription,
    productTerminated: body.productTerminated,
    sku: body.sku,
    categoryId: Number(body.categoryId),
    unitsBuyes: Number(body.unitsBuyes),
    unitsSelled: 0,
    isActive: body.isActive,
    priceGross: Number(body.priceGross),
    priceFinal: Number(body.priceFinal),
    discount: Number(body.discount),
  };

  newProducto = await productsService.createProduct(producto, file);

  if (!newProducto) {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.BAD_REQUEST);
  } else {
    response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, newProducto);
  }

  return res.status(response.status).json(response);
};

module.exports = {
  findAll,
  findProduct,
  findProductsByCategory,
  updateProduct,
  deleteProduct,
  createProduct,
};
