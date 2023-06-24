import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'

const KidsPage = () => {

  const {products, isError, isLoading} = useProducts('/products/?gender=kid');
  
  console.log(products);

  return (
    <ShopLayout title='Teslo-Shop - Kids Clothes' pageDescription='Kids category'>
      <Typography variant='h1' component='h1'>Kids</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Kids Products</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default KidsPage