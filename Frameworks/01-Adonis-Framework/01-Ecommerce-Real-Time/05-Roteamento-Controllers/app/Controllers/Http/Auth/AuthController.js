'use strict';

class AuthController {
  //auth é a autenticação do uusário (vem no header)
  async register({ request, response }) {}

  async login({ request, response, atuh }) {}

  async refreshToken({ request, response, atuh }) {}

  async logout({ request, response, atuh }) {}

  async forgot({ request, response }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController;
