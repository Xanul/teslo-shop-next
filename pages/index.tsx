import { Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import { ShopLayout } from '../components/layout';
import { initialData } from '../database/products';
import { ProductList } from '../components/products/ProductList';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {products, isError, isLoading} = useProducts('/products');
  console.log(isLoading);

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products from Teslo'} >
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
      
    </ShopLayout>
  )
}
