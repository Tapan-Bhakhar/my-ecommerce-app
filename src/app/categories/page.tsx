'use client';

import api, { BASE_URL } from "@/services/api";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Container, Grid } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Category {
    _id: string;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const getResponsiveWidth = () => {
        const width = window.innerWidth;
        if (width >= 900) return '33.33%'; // md=4
        if (width >= 600) return '50%';    // sm=6
        return '100%';                     // xs=12
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/get-categories');
                // console.log("Categories:", response.data.categories);
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom style={{ marginBottom: '20px'}}>
                📂 All Categories
            </Typography>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {categories && categories.map((cat) => (
                    <Link
                        href={`/products?cid=${cat._id}`}
                        key={cat._id}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            width: '31%',
                            // width: getResponsiveWidth(),

                            marginBottom: '10px',
                        }}
                    >
                        <Card
                            sx={{
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="180"
                                image={`${BASE_URL}/${cat.categoryImage}`}
                                alt={cat.categoryName}
                            />
                            <CardContent>
                                <Typography variant="h6">{cat.categoryName}</Typography>
                                <Typography variant="body2">{cat.categoryDescription}</Typography>
                            </CardContent>
                        </Card>
                    </Link>


                ))}
            </Grid>
        </Container>
    )
}

export default CategoryPage;