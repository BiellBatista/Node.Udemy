'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // o objeto ctx (context) diz os dados de uma requisição. Estilo o .NET Core
    if (ctx.request.method() == 'GET') {
      // pegando os dados que estão vindo na request do tipo GET
      const page = parseInt(ctx.request.input('page'));
      const limit = parseInt(ctx.request.input('limit'));

      // atribuindo os valores via GET para a propriedade pagination do contexto
      ctx.pagination = {
        page,
        limit
      };

      const perpage = parseInt(ctx.request.input('perpage'));

      if (perpage) {
        ctx.pagination.limit = perpage;
      }
    }
    // call next to advance the request
    await next();
  }
}

module.exports = Pagination;
