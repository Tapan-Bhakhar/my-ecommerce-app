import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

const WishlistButton = ({ productId, refresh  }: { productId: string, refresh: any }) => {
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWished(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    // let updated;

    // if (wishlist.includes(productId)) {
    //   updated = wishlist.filter((id: string) => id !== productId);
    //   setIsWished(false);
    // } else {
    //   updated = [...wishlist, productId];
    //   setIsWished(true);
    // }
    const updated = wishlist.includes(productId)
      ? wishlist.filter((id: string) => id !== productId)
      : [...wishlist, productId];

    localStorage.setItem('wishlist', JSON.stringify(updated));
    setIsWished(!isWished);

    if (refresh) {
      refresh();
    } // Call the refresh function passed as a prop
  };

  return (
    <IconButton onClick={toggleWishlist} color={isWished ? 'error' : 'default'}>
      <FavoriteIcon />
    </IconButton>
  );
};

export default WishlistButton;
