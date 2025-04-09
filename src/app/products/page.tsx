'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from '@/component/ProductCard';
import api from '@/services/api';
import { useSearchParams } from 'next/navigation';

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
    }
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const searchParams = useSearchParams();
    const categoryId = searchParams.get('cid');
    console.log('categoryId:', categoryId);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/get-products');
                // console.log('Products:', response);
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (categoryId) {
            const filtered = products.filter(product => product.categoryId._id === categoryId);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [products, categoryId]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to MyShop
            </Typography>
            <Grid container spacing={3}>
                {filteredProducts && filteredProducts.map((product) => (
                    <div key={product._id} style={{ marginBottom: '20px' }}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </Grid>

            {/* <CartItemCard item={products} showActions={false} /> */}
        </Container>
    );
}
