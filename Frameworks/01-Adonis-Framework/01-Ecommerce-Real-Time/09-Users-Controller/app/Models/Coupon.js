'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Coupon extends Model {
  //tenho que avisar quais os campos do tipo data para o adonis
  static get dates() {
    return ['created_at', 'updated_at', 'valid_from', 'valid_until'];
  }

  //um cupom tem N usuários
  users() {
    return this.belongsToMany('App/Models/User');
  }

  //um cupom tem N produtos
  products() {
    return this.belongsToMany('App/Models/Product');
  }

  //um cupom tem N pedidos
  orders() {
    return this.belongsToMany('App/Models/Order');
  }
}

module.exports = Coupon;
