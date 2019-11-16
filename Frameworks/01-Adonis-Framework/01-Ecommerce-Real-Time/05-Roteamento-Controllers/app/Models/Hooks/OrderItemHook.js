'use strict';

const OrderItemHook = (exports = module.exports = {});
const Product = user('App/Models/Product');

OrderItemHook.method = async model => {
  //procurando um produto com base no id
  let product = await Product.find(model.product_id);

  model.subtotal = model.quantity * product.price;
};
