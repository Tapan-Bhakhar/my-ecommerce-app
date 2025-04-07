'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '@/component/ProductCard';
import api from '@/services/api';

interface Product {
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
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/get-products');
      console.log("Fetched Products:", response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Later: Dispatch Redux action here
  };

  console.log("Products:", products);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products && products.map((product) => (
        
          <div key={product._id} style={{ marginBottom: '20px' }}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
        ))}
      </Grid>
    </Container>
  );
}
