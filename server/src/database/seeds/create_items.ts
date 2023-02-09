import {Knex} from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    {title: 'Lampadas', image: 'Lampadas.svg'},
    {title: 'Pilhas e baterias', image: 'baterias.svg'},
    {title: 'Papeis e papelao', image: 'papeis-papelao.svg'},
    {title: 'Residuos Eletronicos', image: 'eletronicos.svg'},
    {title: 'Residuos organicos', image: 'organicos.svg'},
    {title: 'Oleo de cozinha', image: 'oleo.svg'},
  ])
}