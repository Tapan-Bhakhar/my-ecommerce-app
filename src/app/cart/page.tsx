'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { BASE_URL } from '@/services/api';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Button,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  updateQuantity,
  removeFromCart,
} from '@/redux/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncrease = (itemId: string, currentQty: number) => {
    dispatch(updateQuantity({ id: itemId, quantity: currentQty + 1 }));
  };

  const handleDecrease = (itemId: string, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: currentQty - 1 }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const handleRemove = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

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
              <div
              key={item._id}
              style={{
                boxSizing: 'border-box',
                padding: '8px',
                width: '20%', 
              }}
            >
                <Card>
                  <CardMedia
                    component="img"
                    height="180"
                    image={`${BASE_URL}/${item.productImage}`}
                    alt={item.productName}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography color="text.secondary">Price: ₹{item.productPrice}</Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <IconButton onClick={() => handleDecrease(item._id, item.quantity)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item._id, item.quantity)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography mt={1}>
                      <strong>Total:</strong> ₹{item.productPrice * item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemove(item._id)}
                      sx={{ mt: 1 }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box textAlign="right">
            <Typography variant="h5">
              Total Amount: ₹{totalAmount}
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
