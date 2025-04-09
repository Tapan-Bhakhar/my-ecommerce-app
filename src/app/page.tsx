'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

// Styled components for the slider
const SliderContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const SliderImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  transition: 'transform 0.5s ease-in-out',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const SliderControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  width: '98%',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  padding: theme.spacing(0, 2),
}));

const SliderDots = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  zIndex: 1,
}));

export default function HomePage() {
  // Images for the slider (placeholder URLs)
  const images = [
    { url: '/api/placeholder/1200/400', alt: 'Featured Products', title: 'New Arrivals', subtitle: 'Check out our latest collection' },
    { url: '/api/placeholder/1200/400', alt: 'Special Offers', title: 'Summer Sale', subtitle: 'Get up to 50% off on selected items' },
    { url: '/api/placeholder/1200/400', alt: 'Exclusive Deals', title: 'Member Exclusive', subtitle: 'Join our loyalty program for special deals' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Image Slider */}
      <SliderContainer>
        {images.map((image, index) => (
          <SliderImage
            key={index}
            sx={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.url})`,
              transform: `translateX(${100 * (index - currentIndex)}%)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {image.title}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {image.subtitle}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Shop Now
            </Button>
          </SliderImage>
        ))}

        {/* Slider Controls */}
        <SliderControls>
          <IconButton 
            onClick={prevSlide} 
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5)' } }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton 
            onClick={nextSlide} 
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5)' } }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </SliderControls>

        {/* Slider Dots - Using Box with conditional styling instead of custom styled component */}
        <SliderDots>
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </SliderDots>
      </SliderContainer>

      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', p: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold">
          Welcome to TPN's Store
        </Typography>
        <Typography variant="h6" mt={2}>
          Shop the best products at unbeatable prices
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          <Link href="/products" style={{ color: '#fff', textDecoration: 'none' }}>
            Browse Products
          </Link>
        </Button>
      </Box>
    </Box>
  );
}