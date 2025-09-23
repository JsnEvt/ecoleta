import knex, { Knex } from 'knex';

export async function seed(knex: Knex) {
  const updatedRows = await knex('items')
    .where('image', 'like', '%.svg')
    .update({
      image: knex.raw("REPLACE(image, '.svg', '.png')")
    })
  console.log(updatedRows);
};