import { Product } from "@/models";
import { db } from "."
import { IProduct } from "@/interfaces";

type ProductSlug = {
  slug: string
}

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  await db.connect();

  const product = await Product.findOne({slug}).lean();

  await db.disconnect();

  if( !product ) {
    return null;
  }

  return JSON.parse(JSON.stringify(product));

}

export const getAllProductsSlugs = async ():Promise<ProductSlug[]> => {

  await db.connect();
  const slugs = await Product.find().select('slug -_id').lean();
  await db.disconnect();

  return slugs;

}

export const getProductsByTerm = async ( term: string ):Promise<IProduct[]> => {
  
  term = term.toString().toLocaleLowerCase();

  db.connect();

  const foundProducts = await Product.find({
    $text: { $search: term }
  })
  .select('title images tags price inStock slug -_id')
  .lean();
  
  db.disconnect();

  return foundProducts;

}

export const getAllProducts = async ():Promise<IProduct[]> => {

  await db.connect();

  const allProducts = await Product.find().lean();

  await db.disconnect();

  return JSON.parse(JSON.stringify(allProducts));
}