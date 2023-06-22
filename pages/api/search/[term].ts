import { db } from '@/database';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces/products';

type Data = { message: string } | IProduct[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch(req.method) {
    case 'GET':
      
      return searchProducts(req, res);
    default:
      return res.status(400).json({message: 'Bad Request'});
  }

  
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  let { term = "" } = req.query;

  if ( term.length === 0 ) {
    return res.status(400).json({message: "No search term"});
  }

  term = term.toString().toLocaleLowerCase();

  db.connect();

  const foundProducts = await Product.find({
    $text: { $search: term }
  })
  .select('title images tags price inStock slug -_id')
  .lean();
  
  db.disconnect();



  return res.status(200).json(foundProducts)

}
