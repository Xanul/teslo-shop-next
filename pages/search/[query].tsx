import { Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products/ProductList';
import { useProducts } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {products, isError, isLoading} = useProducts('/search/haha');

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Search results'} >
      <Typography variant='h1' component='h1'>Search</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Product Search</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
      
    </ShopLayout>
  )
}
