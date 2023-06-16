import { CartList } from "@/components/cart";
import { ShopLayout } from "@/components/layout";
import { Button, Card, CardContent, Divider, Grid, Typography, Link } from "@mui/material";
import { Box } from "@mui/system";
import { OrdenSummary } from '../../components/cart/OrdenSummary';
import NextLink from 'next/link';

const SummaryPage = () => {
  return (
    <ShopLayout title="Order Summary" pageDescription="Orden Summary">
      <Typography variant="h1" component="h1">Orden Summary</Typography>
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
                <Button color="secondary" className="circular-btn" fullWidth sx={{height: 40}}>
                  Place Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;