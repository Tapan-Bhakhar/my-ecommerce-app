'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Container, Typography, Grid, Box, Button, Divider } from '@mui/material';
import CartItemCard from '@/component/CartItemCard';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>No items in the cart.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <div key={item._id}
              style={{
                boxSizing: 'border-box',
                padding: '8px',
                // width: '100%', 
              }}>
                <CartItemCard item={item} />
              </div>
            ))}
          </Grid>

          <Divider sx={{ my: 2, borderColor: 'grey.400' }} />

          <Box textAlign="right">
            <Typography variant="h5">
              Total Amount: ₹{totalPrice}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
