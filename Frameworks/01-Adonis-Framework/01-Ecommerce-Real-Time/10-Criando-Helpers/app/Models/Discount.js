'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Discount extends Model {
  //falando que este modelo referencia a tabela (schema/migrations) 'coupon_order'
  static get table() {
    return 'coupon_order';
  }

  order() {
    //um desconto tem um pedido e a chave estrangeira é order_id
    //o modelo do relacionamento
    //a chave estrangeira na tabela coupon_order
    //a chave primária do modelo do relacionamento
    return this.belongsTo('App/Models/Order', 'order_id', 'id');
  }

  coupon() {
    return this.belongsTo('App/Models/Coupon', 'coupon_id', 'id');
  }
}

module.exports = Discount;
