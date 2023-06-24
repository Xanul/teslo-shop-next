import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'

const MenPage = () => {

  const {products, isError, isLoading} = useProducts('/products/?gender=men');
  
  console.log(products);

  return (
    <ShopLayout title='Teslo-Shop - Mens Clothes' pageDescription='Mens category'>
      <Typography variant='h1' component='h1'>Mens</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Mens Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default MenPage