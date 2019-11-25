'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  /**
   * Relacionamento entre Categoria e Imagem de destaque
   */

  //para criar um relacionamento, bastar criar um método com o nome do modelo que quero relacionar
  image() {
    //categoria recebe a chave da imagem
    return this.belongsTo('App/Models/Image');
  }

  /**
   * Relacionamento entre Categoria e Produtos
   */
  products() {
    //uma categoria pode ter N produtos
    return this.belongsToMany('App/Models/Product');
  }
}

module.exports = Category;
