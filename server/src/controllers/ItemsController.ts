import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
  async index(req: Request, res: Response) {

    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        // image_url: `http://localhost:3333/uploads/${item.image}` //funciona direto na web
        image_url: `http://localhost:8081/uploads/${item.image}` //para buscar os itens de coleta para o aplicativo mobile (hack)
      }
    })

    return res.json(serializedItems)

  }
}

export default ItemsController