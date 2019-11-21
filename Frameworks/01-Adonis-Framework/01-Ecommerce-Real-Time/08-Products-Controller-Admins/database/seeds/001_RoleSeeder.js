'use strict';

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

//Criando as funções, estilo no IdentityServer
/**
 * As Roles são executadas de forma sequencias
 */
const Role = use('Role');

class RoleSeeder {
  async run() {
    //cria a função de ADM
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do Sistema!'
    });

    //cria a função de Gerente
    await Role.create({
      name: 'Manager',
      slug: 'manager',
      description: 'Gerente da Loja!'
    });

    //cria a função do Cliente
    await Role.create({
      name: 'Cliente',
      slug: 'client',
      description: 'Cliente da Loja!'
    });
  }
}

module.exports = RoleSeeder;
