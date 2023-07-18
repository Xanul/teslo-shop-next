import { initialData } from "@/database/products"
import { Delete } from "@mui/icons-material";
import { CardActionArea, CardMedia, Grid, Link, Typography, Box, Button, Divider } from "@mui/material"
import NextLink from 'next/link';
import { FC, useContext } from "react";
import { ItemCounter } from "../ui";
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);
  
  const onNewCartQuantity = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product)
  }
  

  return (
    <>
      {
        cart.map( product => (
          <Grid container spacing={2} key={product.slug + product.size} sx={{mb:1}}>
            <Grid item xs={3}>
              {/* Link to product page */}
              <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia 
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{borderRadius: '5px'}}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">Size: <strong>{product.size}</strong></Typography>
                {
                  editable
                  ? <ItemCounter 
                      currentValue={product.quantity}
                      maxValue={5}
                      onUpdateQuantity={(value) => onNewCartQuantity(product, value)}
                    />
                  : <Typography variant="subtitle1">{product.quantity} {product.quantity > 1 ? 'Items' : 'Item'}</Typography> 
                }
                {
                  editable && (
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      sx={{width:"100px", fontSize: 12}} 
                      fullWidth={true}
                      onClick={() => removeCartProduct(product)}
                    >
                      <Delete sx={{fontSize: 17, mr: 1}}/>
                      Remove
                    </Button>
                  )
                }
              </Box>
            </Grid>
            <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
              <Typography variant="subtitle1"> {`$${product.price}`} </Typography>
            </Grid>
            
          </Grid>
        ))
      }
    </>
  )
}
