'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  //teste método é chamado toda vez que um model é chamado
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    //este é um gancho que será executando quando hover um "save"(criação ou atualização)
    this.addHook('beforeSave', async userInstance => {
      /**
       * Quando eu altero um campo, o dirty é modificado e com isso, o hook sabe o que alterar
       * é estilo o modified do EFCore
       */
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  //ocultando o campo password em qualquer consulta ao banco
  static get hidden() {
    return ['password'];
  }

  /**
   * traits me possibilita chamar um código em outro. Por exemplo, eu poderia colocar
   * o método hidden em outro arquivo e chamá-lo na trait
   */
  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  image() {
    //retorna um modelo da imagem
    //1X1
    return this.belongsTo('App/Models/Image');
  }

  coupons() {
    //retorna vários coupons
    //NXM
    return this.belongsToMany('App/Models/Coupon');
  }
}

module.exports = User;
