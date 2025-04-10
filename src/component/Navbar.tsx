'use client';

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Button, 
  Box,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  Avatar
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CartItem } from '@/redux/cartSlice';

// Styled search bar component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Add a toolbar component to provide spacing below the fixed navbar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Navbar = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const totalItems = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
  
  // State for category dropdown
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<null | HTMLElement>(null);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleCategoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  return (
    <>
      {/* Changed from position="static" to position="fixed" for sticky behavior */}
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          {/* Logo or Brand Name */}
          <Typography variant="h6" sx={{ flexGrow: 0, mr: 2 }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#fff' }}>
              MyShop
            </Link>
          </Typography>

          {/* Categories Dropdown */}
          {/* <Button 
            sx={{ color: '#fff', mr: 2 }}
            onClick={handleCategoryMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Categories
          </Button>
          <Menu
            anchorEl={categoryAnchorEl}
            open={Boolean(categoryAnchorEl)}
            onClose={handleCategoryMenuClose}
          >
            <MenuItem onClick={handleCategoryMenuClose}>Electronics</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>Clothing</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>Home & Kitchen</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>Beauty</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>Sports</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>Books</MenuItem>
            <MenuItem onClick={handleCategoryMenuClose}>All Categories</MenuItem>
          </Menu> */}

<Link href="/categories" passHref>
              <Button sx={{ color: '#fff' }}>CATEGORIES</Button>
            </Link>

          {/* Search Bar */}
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search products..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link href="/" passHref>
              <Button sx={{ color: '#fff' }}>Home</Button>
            </Link>
            <Link href="/products" passHref>
              <Button sx={{ color: '#fff' }}>Products</Button>
            </Link>
            <Link href="/deals" passHref>
              <Button sx={{ color: '#fff' }}>Deals</Button>
            </Link>
          </Box>

          {/* Wishlist Icon */}
          <IconButton color="inherit" href="/wishlist">
            <Badge badgeContent={0} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>

          {/* Cart Icon */}
          <IconButton color="inherit" href="/cart">
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Account */}
          <IconButton 
            color="inherit"
            onClick={handleUserMenuOpen}
          >
            <PersonOutlineIcon />
          </IconButton>
          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={handleUserMenuClose}
          >
            <MenuItem onClick={handleUserMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Orders</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Wishlist</MenuItem>
            <Divider />
            <MenuItem onClick={handleUserMenuClose}>Sign In</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Register</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* This offset component prevents content from hiding behind the fixed AppBar */}
      <Offset />
    </>
  );
};

export default Navbar;