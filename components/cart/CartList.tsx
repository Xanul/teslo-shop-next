import { initialData } from "@/database/products"
import { Delete } from "@mui/icons-material";
import { CardActionArea, CardMedia, Grid, Link, Typography, Box, Button, Divider } from "@mui/material"
import NextLink from 'next/link';
import { FC } from "react";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

  return (
    <>
      {
        productsInCart.map( product => (
          <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
            <Grid item xs={3}>
              {/* Link to product page */}
              <NextLink href="/product/slug" passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia 
                      image={`/products/${product.images[0]}`}
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
                <Typography variant="body1">Talla: <strong>M</strong></Typography>
                {
                  editable
                  ? <ItemCounter />
                  : <Typography variant="subtitle1">3 Items</Typography> 
                }
                {
                  editable && (
                    <Button variant="outlined" color="secondary" sx={{width:"100px", fontSize: 12}} fullWidth={true}>
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
