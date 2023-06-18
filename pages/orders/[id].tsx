import { CartList } from "@/components/cart";
import { ShopLayout } from "@/components/layout";
import { Card, CardContent, Divider, Grid, Typography, Link, Chip } from "@mui/material";
import { Box } from "@mui/system";
import { OrdenSummary } from '../../components/cart/OrdenSummary';
import NextLink from 'next/link';
import { CreditCardOff, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout title="Orden Summary #12442" pageDescription="Orden Summary">
      <Typography variant="h1" component="h1">Order: ABC123</Typography>
      {/* <Chip 
        sx={{my:2}}
        label="Payment pending"
        variant="outlined"
        color="error"
        icon={ <CreditCardOff /> }
      /> */}
      <Chip 
        sx={{my:2}}
        label="Paid Order"
        variant="outlined"
        color="success"
        icon={ <CreditScoreOutlined /> }
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order (3 Products)</Typography>
              <Divider sx={{my:1}}/>
              
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping Address</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              
              <Typography>Rodrigo Rivas</Typography>
              <Typography>Av Yucatan 506</Typography>
              <Typography>Merida Yucatan, 97135</Typography>
              <Typography>Mexico</Typography>
              <Typography>9992307660</Typography>
              
              <Divider sx={{my:1}}/>
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrdenSummary />
              <Box sx={{mt:3}}> 
                <h1>Pagar</h1>
                <Chip 
                  sx={{my:2}}
                  label="Paid Order"
                  variant="outlined"
                  color="success"
                  icon={ <CreditScoreOutlined /> }
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage;