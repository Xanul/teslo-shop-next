import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '@/interfaces';
import { FC } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { dbProducts } from '@/database';

interface Props {
  product: IProduct
}

const ProductPage:FC<Props> = ({product}) => {

  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={ product.images } />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* Titles */}
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
            {/* Amount */}
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Amount</Typography>
              <ItemCounter />
              <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes} />
            </Box>
            {/* Add to cart */}
            {
              product.inStock > 0
                ? (
                  <Button color='secondary' className='circular-btn' sx={{height: 40}}>
                    Add to cart
                  </Button>
                )
                : (
                  <Chip color="error" label="Out of stock" variant='outlined'/>
                )
            }
            {/* <Chip label="Not available" color='error' variant='outlined' /> */}

            {/* Description */}
            <Box sx={{mt:2}}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>          
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const allSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: allSlugs.map((slug) => {
      return {
        params: slug
      }
    }),
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
  
  const {slug = ''} = params as { slug: string };

  const productBySlug = await dbProducts.getProductBySlug(slug);

  if (!productBySlug) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product: productBySlug
    },
    revalidate: 86400
  }

}

// getServerSideProps
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   console.log(params)

//   const { slug } = params as {slug: string};

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }

// }

export default ProductPage