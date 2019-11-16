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

  async login({ request, response, atuh }) {}

  async refreshToken({ request, response, atuh }) {}

  async logout({ request, response, atuh }) {}

  async forgot({ request, response }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController;
