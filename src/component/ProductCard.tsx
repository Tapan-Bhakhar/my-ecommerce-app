'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { BASE_URL } from '@/services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

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
    };
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity: 1,
      })
    );
    console.log("Product added to cart:", product.productName); // Add th
  };

  return (
    <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={`${BASE_URL}/${product.productImage}`}
        alt={product.productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹ {product.productPrice}
        </Typography>

        {/* <Typography variant="caption" color="text.secondary">
          Category: {product.categoryId?.categoryName}
        </Typography> */}
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
  );
};

export default ProductCard;
