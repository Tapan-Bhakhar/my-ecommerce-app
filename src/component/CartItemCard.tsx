'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/cartSlice';
import { BASE_URL } from '@/services/api';

interface CartItemCardProps {
  item: {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    quantity: number;
  };
  showActions?: boolean; // control buttons
}

export default function CartItemCard({ item, showActions = true }: CartItemCardProps) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item._id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
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
          {showActions && (
            <>
              <IconButton onClick={handleDecrease}>
                <RemoveIcon />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton onClick={handleIncrease}>
                <AddIcon />
              </IconButton>
            </>
          )}
          {!showActions && <Typography>Quantity: {item.quantity}</Typography>}
        </Box>

        <Typography mt={1}>
          <strong>Total:</strong> ₹{item.productPrice * item.quantity}
        </Typography>

        {showActions && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
            sx={{ mt: 1 }}
          >
            Remove
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
