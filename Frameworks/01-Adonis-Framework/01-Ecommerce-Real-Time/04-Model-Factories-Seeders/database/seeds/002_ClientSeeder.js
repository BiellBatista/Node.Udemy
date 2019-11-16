'use strict';

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Role = use('Role');
const User = use('App/Models/User');

class ClientSeeder {
  async run() {
    //execute o método find, usando o cmapo slug
    const role = await Role.findBy('slug', 'client');
    const clients = await Factory.model('App/Model/User').createMany(30);
    //adicionando a função client nos 30 modelos de usuário
    await Promise.all(
      clients.map(async client => {
        //uso o attach em relacionamentos N pra M. Ele me permite associar modelos diferentes.
        //desde que o relacionamento já esteja no model
        //devo passar um Array no attach
        await client.roles().attach([role.id]);
      })
    );

    const user = await User.create({
      name: 'Gabriel',
      surname: 'Batista',
      email: 'gabriel.batista@gmail.com',
      password: 'secret'
    });

    const adminRole = await Role.findBy('slug', 'admin');
    await user.roles().attach([adminRole.id]);
  }
}

module.exports = ClientSeeder;
