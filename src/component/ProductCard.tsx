'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';

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
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
        
      <CardMedia
        component="img"
        height="180"
        image={product.productImage}
        alt={product.productName}
      />
      <CardContent>

        <Typography gutterBottom variant="h6" component="div">
          {product.productName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          ₹ {product.productPrice}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Category: {product.categoryId?.categoryName}
        </Typography>

      </CardContent>


      <CardActions>
        <Button size="small" href={`/products/${product._id}`}>View</Button>
        <Button size="small" variant="contained" onClick={() => onAddToCart(product._id)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
