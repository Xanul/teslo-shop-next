import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  { message: string }
  | IProduct


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch ( req.method ) {
    case 'GET':
      return getProductBySlug(req, res);
    default:
      return res.status(400).json({message: 'Bad Request'});
    
  }

}

const getProductBySlug = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { slug } = req.query;

  db.connect();
  const productBySlug = await Product.findOne({slug}).lean();
  db.disconnect();

  if ( !productBySlug ) {
    return res.status(400).json({message: "Product not found"})
  }

  return res.status(200).json(productBySlug);

  

}