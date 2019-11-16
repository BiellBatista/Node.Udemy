'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  //uma imagem tem uma categoria
  image() {
    return this.belongsTo('App/Models/Image');
  }

  /**
   * Relacionamento entre produto e imagem
   * Galeria de imagem do produto
   */
  images() {
    //um produto tem N imagens
    return this.belongsToMany('App/Models/Image');
  }

  /**
   * Relacionamento entre produto e categorias
   */
  categories() {
    //um produto tem N categorias
    return this.belongsToMany('App/Models/Category');
  }

  /**
   * Relacionamento entre produtos e cupons de desconto
   */
  cupons() {
    return this.belongsToMany('App/Models/Cupon');
  }
}

module.exports = Product;
