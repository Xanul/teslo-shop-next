import { CartList } from "@/components/cart";
import { ShopLayout } from "@/components/layout";
import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { OrdenSummary } from '../../components/cart/OrdenSummary';
import { useRouter } from "next/router";



const CartPage = () => {

  const router = useRouter();

  return (
    <ShopLayout title="Cart - 3" pageDescription="Shopping cart from teslo">
      <Typography variant="h1" component="h1">Cart</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{my:1}}/>
              <OrdenSummary />
              <Box sx={{mt:3}}> 
                <Button 
                  color="secondary" 
                  className="circular-btn" 
                  fullWidth sx={{height: 40}}
                  onClick={ () => router.push('/checkout/summary') }
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage;