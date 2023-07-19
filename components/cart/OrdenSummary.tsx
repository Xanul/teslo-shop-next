import { CartContext } from "@/context"
import { currency } from "@/utils"
import { Divider, Grid, Typography } from "@mui/material"
import { useContext } from "react"



export const OrdenSummary = () => {

  const { numberOfItems, subTotal, taxRate, total } = useContext(CartContext);
  const term = numberOfItems > 1 ? " Items" : " Item";
  
  
  
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems + term}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{ currency.formatCurrency(subTotal) }</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.formatCurrency(taxRate)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{my: 1}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.formatCurrency(total)}</Typography>
      </Grid>
    </Grid>
  )
}
