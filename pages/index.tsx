import { Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import { ShopLayout } from '../components/layout';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products from Teslo'} >
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>
    </ShopLayout>
  )
}
