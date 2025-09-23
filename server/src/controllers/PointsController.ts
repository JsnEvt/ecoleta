import { Request, Response } from 'express'
import knex from '../database/connection';


class PointsController {

  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.39:3333/uploads/${point.image}`

      }
    })

    return response.json(serializedPoints)
  }


  async show(req: Request, res: Response) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()
    if (!point) {
      return res.status(400).json({ message: 'Point not found.' })
    }

    const serializedPoint = {
      ...point,
      // image_url: `http://localhost:3333/uploads/${point.image}`
      image_url: `http://192.168.0.39:3333/uploads/${point.image}`
    }

    //listando os itens que cada ponto de coleta, coleta.
    //EQUIVALE AO SQL ABAIXO:
    //SELECT * FROM items
    //  JOIN point_items ON items.id = points_items.item_id
    //  WHERE point_items.point_id = {id}
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return res.json({ point: serializedPoint, items })
  }

  async create(req: Request, res: Response) {
    const { name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;

    //para evitar que as funcoes sejam executadas independentemente (uma tem que depender da outra)
    //se uma falhar, a outra nao sera executada.
    //usamos uma funcao do knex chamda transaction().

    const trx = await knex.transaction()

    const points = {
      image: req.file?.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }

    const insertedIds = await trx('points').insert(points)

    const point_id = insertedIds[0]

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id
        }
      })
    await trx('point_items').insert(pointItems)

    await trx.commit()

    return res.json({
      id: point_id,
      ...points
    })

  }

}

export default PointsController