'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  static boot() {
    super.boot();

    //adicionando uma regra de negócio
    //a regra (o método updateValues) será acionado após uma procura no banco.
    //o afterFind retorna um pedido (objeto) para o hook
    this.addHook('afterFind', 'OrderHook.updateValues');
    //a função afterPaginate retorna todos os pedidos (objetos) do banco para o hook
    this.addHook('afterPaginate', 'OrderHook.updateCollectionValues');
  }

  //um pedido tem N itens
  items() {
    return this.hasMany('App/Models/OrderItem');
  }

  coupons() {
    return this.belongsToMany('App/Models/Coupon');
  }

  discount() {
    return this.hasMany('App/Models/Discount');
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }
}

module.exports = Order;
