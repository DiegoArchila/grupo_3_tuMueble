const productsRepository = require("../repositories/ProductsRepository.js");
const productImagesRepository = require("../repositories/ProductImagesRepository.js");
const productCategoryRepository = require("../repositories/ProductCategoryRepository.js");

/**
 * Return all products
 *
 * @return {*} allProducts  -Json with all the products
 */
const findAllWithMainImage = async () => {
  let allProducts = [];
  let mainImages = [];
  let idProducts = [];

  allProducts = await productsRepository.findAll();

  if (allProducts.length > 0) {
    idProducts = allProducts.map((product) => {
      return product.id;
    });

    mainImages = await productImagesRepository.findAllByIdProductsAndIsMain(
      idProducts,
      true
    );

    allProducts.forEach((product) => {
      product.mainImage = mainImages.find(
        (image) => image.productId == product.id
      );
    });
  }

  return allProducts;
};

/**
 * Product with the images
 *
 * @param {number} idProducts -Id of the product
 * @return {*} product  -Product with the images
 */
const findProductWithImages = async (idProduct) => {
  let product = {};
  let productImages = [];

  product = await productsRepository.findByPk(idProduct);

  if (product) {
    productImages =
      await productImagesRepository.findAllByProductIdOrderByIsMain(idProduct);

    product.images = productImages;
  }

  return product;
};

/**
 * All products by category
 *
 * @param {number} categoryId -Id of the category
 * @return {*}  -All products by category
 */
const findAllProductsByCategory = async (categoryId) => {
  //Filtro por categorias
  let category = {};
  let mainImages = [];
  let idProducts = [];
  let productsResponse = [];

  category = await productCategoryRepository.findByPk(categoryId);

  if (category && category.category) {
    productsResponse = await productsRepository.findAllByCategory(categoryId);

    if (productsResponse.length > 0) {
      idProducts = productsResponse.map((product) => {
        return product.id;
      });

      mainImages = await productImagesRepository.findAllByIdProductsAndIsMain(
        idProducts,
        true
      );

      productsResponse.forEach((product) => {
        product.mainImage = mainImages.find(
          (image) => image.productId == product.id
        );
      });
    }
  }

  return productsResponse;
};

module.exports = {
  findAllWithMainImage,
  findProductWithImages,
  findAllProductsByCategory,
};
