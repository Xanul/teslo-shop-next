import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layout/ShopLayout';


const emptyCartPage = () => {
  return (
    <ShopLayout title={'Empty Car'} pageDescription="There are no items in cart">
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        flexDirection={{xs: 'column', sm: 'row'}}
      >
        <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography marginLeft={2}>Cart is empty</Typography>
          <NextLink href='/' passHref legacyBehavior>
            <Link typography='h4' color='secondary' marginLeft={2}>
              Return
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
    
  )
}
 export default emptyCartPage