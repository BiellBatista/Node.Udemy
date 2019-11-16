'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/**
 * Auth Routes
 */

//agrupando as rotas em prefixo ou namespace
//o namespace serve para indicar que o Adonis irá buscar os controllers da rota no modulo Auth
//prefixo serve para adicionar um padrão. Exemplo, GET /v1/auth/nomeController
Route.group(() => {
  Route.post('/register', 'AuthController.register').as('auth.register');
  Route.post('/login', 'AuthController.login').as('auth.login');
  Route.post('/refresh', 'AuthController.refresh').as('auth.refresh');
  Route.post('/logout', 'AuthController.logout').as('auth.logout');
})
  .prefix('v1/auth')
  .namespace('Auth');
