import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import NextLink from "next/link";
import { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces/products";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink legacyBehavior href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <Chip 
                color="primary"
                label="Out of stock"
                sx={{
                  position: 'absolute', 
                  zIndex: 99, 
                  top: 10, 
                  left: 10,
                  display: product.inStock > 0 ? "none" : "flex"
                }}
              />
              <CardMedia
                component="img"
                className="fadeIn"
                image={productImage}
                alt={product.title}
                onLoad={()=> setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={400}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};
