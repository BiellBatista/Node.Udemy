'use strict';

const Database = use('Database');
const User = use('App/Models/User');
const Role = use('Role');

class AuthController {
  //auth é a autenticação do uusário (vem no header)
  async register({ request, response }) {
    const trx = await Database.beginTransaction();

    try {
      //o request.all pega retorna todos os dados
      const { name, surname, email, password } = request.all();
      const user = await User.create({ name, surname, email, password }, trx);
      const userRole = await Role.findBy('slug', 'client');

      await user.roles().attach([userRole.id], null, trx);
      await trx.commit();

      return response.status(201).send({ data: user });
    } catch (error) {
      await trx.rollback();

      return response
        .status(400)
        .send({ message: 'Erro ao realizar o cadastro!' });
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all();
    let data = await auth.withRefreshToken().attempt(email, password);

    return response.send({ data });
  }

  async refreshToken({ request, response, auth }) {
    //pegando o refresh_token no body
    let refresh_token = request.input('refresh_token');

    //verificando se o refresh_token está no head
    if (!refresh_token) {
      refresh_token = request.header('refresh_token');
    }

    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token); //gerando um novo token

    return response.send({ data: user });
  }

  async logout({ request, response, auth }) {
    //pegando o refresh_token no body
    let refresh_token = request.input('refresh_token');

    //verificando se o refresh_token está no head
    if (!refresh_token) {
      refresh_token = request.header('refresh_token');
    }

    await auth.authenticator('jwt').revokeTokens([refresh_token], true);
    //invalidando o token e apagando ele da base (true apaga ele da base)

    return response.status(204).send({});
  }

  async forgot({ request, response }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController;
