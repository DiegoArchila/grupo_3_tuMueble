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

  if (categoryId) {
    productsResponse = await productsService.findAllProductsByCategory(
      categoryId
    );
  }

  response = ApiFormats.ApiFormat(ApiFormats.ApiStatus.OK, productsResponse);

  return res.status(response.status).json(response);
};

module.exports = {
  findAll,
  findProduct,
  findProductsByCategory,
};
