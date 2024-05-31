import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtil";
import { toast } from "react-toastify";

const initialState = () => {
  const storedState = JSON.parse(localStorage.getItem("cart"));
  if (storedState && typeof storedState === "object") {
    return storedState;
  } else {
    return {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, quantity: item.quantity } : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
        toast.success("Product added to cart!");
      }
      return updateCart(state);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      toast.success("Product removed from cart!");
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
