/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate() //del sadece datayı siler truncate data + meta datayı siler
  await knex('Users').insert([
    {id: 1, Name: 'Emre', Surname: 'Öztürk', RoleName: 'Admin', Email: 'emre@emre.com'},
    {id: 2, Name: 'Yaso', Surname: 'Öztürk', RoleName: 'Admin', Email: 'yas@emre.com'},
    {id: 3, Name: 'Anne', Surname: 'Öztürk', RoleName: 'User', Email: 'anne@emre.com'}
  ]);
};
