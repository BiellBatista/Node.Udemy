'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class OrderItem extends Model {
  static boot() {
    //devo chamar o boot da clase pai
    super.boot();

    //anes de salvar, devo atualizar o subtotal
    this.addHook('beforeSave', 'OrderItemHook.updateSubtotal');
  }

  static get traits() {
    return ['App/Models/Traits/NoTimestamp'];
  }

  product() {
    return this.belongsTo('App/Models/Product');
  }

  order() {
    return this.belongsTo('App/Models/Order');
  }
}

module.exports = OrderItem;
