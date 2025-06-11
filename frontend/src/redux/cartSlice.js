import { createSlice } from "@reduxjs/toolkit";
const intialState = {
  cartItems: JSON.parse(localStorage.getItem("carItems")) || [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState: intialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("carItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("carItems", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("carItems");
    },
  },
});

export const { addToCart, removeFromCart,incrementQuantity,decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
