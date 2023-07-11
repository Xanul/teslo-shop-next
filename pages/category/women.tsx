import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'

const WomenPage = () => {

  const {products, isError, isLoading} = useProducts('/products/?gender=women');

  return (
    <ShopLayout title='Teslo-Shop - Women Clothes' pageDescription='Women category'>
      <Typography variant='h1' component='h1'>Women</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Women Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default WomenPage