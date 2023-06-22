import { Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import { ShopLayout } from '../components/layout';
import { initialData } from '../database/products';
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '@/hooks';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {products, isError, isLoading} = useProducts('/products');

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products from Teslo'} >
      <Typography variant='h1' component='h1'>Home</Typography>
      {
        isLoading
          ? <h1>Cargando...</h1>
          : <ProductList products={ products } />
      }
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>
      
    </ShopLayout>
  )
}
