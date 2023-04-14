import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layout';


const Custom404 = () => {
  return (
    <ShopLayout title={'Page not found'} pageDescription={'Nothing to show here'} >
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 200px)'
        flexDirection={{xs: 'column', sm: 'row'}}
      >
        <Typography mr='15px' variant='h1' component='h1' fontSize={80} fontWeight={400}>404</Typography>
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={400} display={{xs: 'none', sm: 'inline'}}>|</Typography>
        
        <Typography marginLeft={2}>Page not found</Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404;