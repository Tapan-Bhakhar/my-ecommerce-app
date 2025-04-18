'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { BASE_URL } from '@/services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { Box } from '@mui/system';
import WishlistButton from '@/app/wishlist/WishlistButton';

interface ProductProps {
  product: {
    _id: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productURL: string;
    productDescription: string;
    categoryId: {
      _id: string;
      categoryName: string;
    }
  };
  refresh?: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, refresh }: any) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      _id: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage,
    }));
    console.log("DISPATCHING", product._id);
  };

  return (

    // Wrap your product cards like this
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        // padding: 2,
        justifyContent: 'flex-start',
      }}
    >
      <Card
        key={product._id}
        sx={{
          width: 200,
          height: 300,
          borderRadius: 3,
          boxShadow: 3,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: '0',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 105,
          right: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // translucent background
          backdropFilter: 'blur(5px)', // actual blur effect
          WebkitBackdropFilter: 'blur(5px)', // for Safari
          borderRadius: '20%',
          height: '30px',
          width: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <WishlistButton productId={product._id} refresh={refresh}/>
        </div>
        <CardMedia
          component="img"
          image={`${BASE_URL}/${product.productImage}`}
          alt={product.productName}
          sx={{
            height: '150px',
            width: '100%',
            objectFit: 'fill', // crop and fill the space
            overflow: 'hidden',
            display: 'block'
          }}
        />

        <CardContent>

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px', // adjust based on layout
            }}
          >
            {product.productName}
          </Typography>

          {/* <Typography gutterBottom variant="h6" component="div">
            {product.productName.length > 10
              ? `${product.productName.slice(0, 10)}...`
              : product.productName}
          </Typography> */}

          <Typography variant="body2" color="text.secondary">
            ₹ {product.productPrice}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Category: {product.categoryId.categoryName}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" href={`/products/${product._id}`}>
            View
          </Button>
          <Button size="small" variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>

  );
};

export default ProductCard;
