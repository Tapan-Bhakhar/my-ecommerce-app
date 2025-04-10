'use client';

import React from 'react';
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import WishlistButton from './WishlistButton';

export default function WishlistPage() {
    // const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const wishlistItems = [
        {
            _id: '1',
            productName: 'Product 1',
            productPrice: 100,
            productImage: 'image1.jpg',
        },
        {
            _id: '2',
            productName: 'Product 2',
            productPrice: 200,
            productImage: 'image2.jpg',
        },
    ];
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                🤍 Your Wishlist
            </Typography>
            {wishlistItems.length === 0 ? (
                <Typography> No items in wishlist</Typography>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {wishlistItems.map((item) => (
                        <div key={item._id} style={{ marginBottom: '20px' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                <img src={item.productImage} alt={item.productName} style={{ width: '100%', height: 'auto' }} />
                                <Typography variant="h6">{item.productName}</Typography>
                                <Typography variant="body1">Price: ₹{item.productPrice}</Typography>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Typography variant="h6" sx={{ mt: 2 }}>
                <WishlistButton productId="1" /> {/* Example product ID */}
                <WishlistButton productId="2" /> {/* Example product ID */}
                </Typography>
        </Container>
    )
}