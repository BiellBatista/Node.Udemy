'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class PasswordReset extends Model {
  static boot() {
    super.boot(); //devo instanciar o super, antes de tudo

    this.addHook('beforeCreate', async model => {
      const expires_at = new Date();
      //token terá 30 minutos de vida
      expires_at.setMinutes(expires_at.getMinutes() + 30);

      model.token = str_random(25);
      model.expires_at = expires_at;
    });
  }

  /**
   * toda vez que for realizado uma operação, o Adonis.js irá procurar os get e sets
   */
  //formata para o padrão do MySQL
  static get dates() {
    return ['created_at', 'update_at', 'expires_at'];
  }
}

module.exports = PasswordReset;
