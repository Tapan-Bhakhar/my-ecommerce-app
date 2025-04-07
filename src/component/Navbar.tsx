'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CartItem } from '@/redux/cartSlice';

const Navbar = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const totalItems = cartItems.reduce((acc: number, item:  CartItem) => acc + item.quantity, 0);

  return (

    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>

        {/* Logo or Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#fff' }}>
            MyShop
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/" passHref>
            <Button sx={{ color: '#fff' }}>Home</Button>
          </Link>
          <Link href="/categories" passHref>
            <Button sx={{ color: '#fff' }}>Categories</Button>
          </Link>
          <Link href="/products" passHref>
            <Button sx={{ color: '#fff' }}>Products</Button>
          </Link>
        </Box>

        {/* Cart Icon */}
        <IconButton color="inherit" href="/cart">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>

        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
