'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Env = use('Env');

class Image extends Model {
  //toda vez que ocorrer uma operação, irei exeuctar o método static get
  static get computed() {
    return ['url'];
  }

  getUrl({ path }) {
    return `${Env.get('APP_URL')}/images/${path}`;
  }
}

module.exports = Image;
