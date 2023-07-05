import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products/ProductList';
import { GetServerSideProps, NextPage } from 'next'
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
}

const SearchPage:NextPage<Props> = ({products}) => {

  console.log(products)

  // const {products, isError, isLoading} = useProducts('/search/raven');

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Search results'} >
      <Typography variant='h1' component='h1'>Search</Typography>
      <Typography variant='h2' sx={{ mb: 2 }}>Product Search</Typography>
      <ProductList products={ products } />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { query } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  let products = await dbProducts.getProductsByTerm(query);

  // Todo: retornar otros productos si no encuentra

  return {
    props: {
      products
    }
  }
}

export default SearchPage;