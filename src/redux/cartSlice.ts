import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Cart item structure including quantity
export interface CartItem {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
}

// Payload structure for adding to cart (no quantity from UI)
interface AddToCartPayload {
  _id: string;
  productName: string;
  productPrice: number;
  productImage: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Add to cart
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {

      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ Remove item
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    // ✅ Clear the cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
