import { initialData } from "@/database/products"
import { CardActionArea, CardMedia, Grid, Link, Typography, Box, Button } from "@mui/material"
import NextLink from 'next/link';
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export const CartList = () => {

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
                      image={`products/${product.images[0]}`}
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
                {/* Condicional */}
                <ItemCounter />
              </Box>
            </Grid>
            <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
              <Typography variant="subtitle1"> {`$${product.price}`} </Typography>
              {/* Editable */}
              <Button variant="text" color="secondary">
                Remove
              </Button>
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
