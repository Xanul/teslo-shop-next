import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { FC, useContext, useState } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { dbProducts } from '@/database';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';

interface Props {
  product: IProduct
}

const ProductPage:FC<Props> = ({product}) => {

  const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`);
  const {cart, addProductToCart} = useContext(CartContext);
  
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectSize = (size: ISize) => {
    setTempCartProduct((current) => ({
      ...current,
      size
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
  
    addProductToCart(tempCartProduct)

    router.push('/cart');
  }

  const updatedQuantity = (quantity: number) => {
    setTempCartProduct((current) => ({
      ...current,
      quantity
    }))
  }

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
              <ItemCounter 
                currentValue={tempCartProduct.quantity}
                onUpdateQuantity={updatedQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />
              <SizeSelector  
                sizes={product.sizes} 
                selectedSize={ tempCartProduct.size }
                onSelectedSize={selectSize}  
              />
            </Box>
            {/* Add to cart */}
            {
              product.inStock > 0
                ? (
                  <Button 
                    color='secondary' 
                    className='circular-btn' 
                    sx={{height: 40}}
                    variant={tempCartProduct.size ? "contained" : "outlined"}
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.size 
                        ? "Add to cart"
                        : "Select a size"
                    }
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