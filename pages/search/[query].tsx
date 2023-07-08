import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products/ProductList';
import { GetServerSideProps, NextPage } from 'next'
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string
}

const SearchPage:NextPage<Props> = ({products, foundProducts, query}) => {

  // const {products, isError, isLoading} = useProducts('/search/raven');

  return (
    <ShopLayout title={'Teslo-Shop - Search'} pageDescription={'Search results'} >
      <Typography variant='h1' component='h1'>Product Search</Typography>
      {
        foundProducts
          ? <Typography variant='h2' sx={{ mb: 2 }} textTransform="capitalize">{ `Term: ${query}` }</Typography>
          : (
            <Box display="flex">
              <Typography variant='h2' sx={{ mb: 2 }}>Product not found </Typography>
              <Typography variant='h2' sx={{ ml: 2 }} color="secondary" textTransform="capitalize">{ query } </Typography>
            </Box>
          )
      }
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
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm("shirts");
  }
  


  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage;