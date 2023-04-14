import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { Inter } from 'next/font/google';
import { ShopLayout } from '../components/layout';
import { initialData } from '../database/products';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products from Teslo'} >
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All Products</Typography>
      <Grid container spacing={4}>
        {
          initialData.products.map( product => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia 
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ShopLayout>
  )
}
