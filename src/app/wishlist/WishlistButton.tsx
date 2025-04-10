import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

const WishlistButton = ({ productId }: { productId: string }) => {
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWished(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id: string) => id !== productId)
      : [...wishlist, productId];

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsWished(!isWished);
  };

  return (
    <IconButton onClick={toggleWishlist} color={isWished ? 'error' : 'default'}>
      <FavoriteIcon />
    </IconButton>
  );
};

export default WishlistButton;
