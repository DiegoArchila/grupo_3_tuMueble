const productsRepository = require("../repositories/ProductsRepository.js");
const productImagesRepository = require("../repositories/ProductImagesRepository.js");
const productCategoryRepository = require("../repositories/ProductCategoryRepository.js");
const productTaxesRepository = require("../repositories/ProductTaxesRepository.js");

/**
 * Update a product
 *
 * @param {*} productId -Id of the product to update
 * @param {*} producto  -Data for update
 * @return {*} -Product updated
 */
const updateProduct = async (productId, producto) => {
  //product data organized

  let productUpdate = {};
  let productTax = {};

  productUpdate = await productsRepository.update(productId, producto);
  /*await db.ProductImages.update({          
          pathImagen: file.filename,          
        },{where:{productId:productId,isMain:true}});*/

  productTax = await productTaxesRepository.updateProductTaxesByProductId(
    Number(producto.taxesId),
    productId
  );

  return productUpdate;
};

/**
 * Delete a product by id
 *
 * @param {number} productId -Id of the product or delete
 * @return {boolean} -Return true if the delete of the product and there children was success
 */
const deleteProduct = async (productId) => {
  //let principalImage = {};
  /*principalImage = await db.ProductImages.findOne({
          where: { productId, isMain: true },
        });
        if (principalImage.pathImagen) {
          functions.eliminarArchivo(
            `/public/img/store/products/${principalImage.pathImagen}`
          );
        }*/
  let deleteSuccess = false;

  deleteSuccess = await productImagesRepository.deleteWhere({ productId });
  deleteSuccess = await productTaxesRepository.deleteWhere({ productId });
  deleteSuccess = await productsRepository.deleteWhere({ id: productId });

  return deleteSuccess;
};

/**
 * Create a new product
 *
 * @param {*} producto  -Product to create
 * @param {*} fileImage -Main image
 * @return {*}  -Product create
 */
const createProduct = async (producto, fileImage) => {
  let newProducto = {};

  newProducto = await productsRepository.create(producto);
  await productImagesRepository.create({
    isMain: 1,
    pathImagen: fileImage.filename,
    productId: newProducto.id,
  });

  await productTaxesRepository.create({
    taxeId: Number(producto.taxesId),
    productId: newProducto.id,
  });

  return newProducto;
};

module.exports = {
  updateProduct,
  deleteProduct,
  createProduct,
};
