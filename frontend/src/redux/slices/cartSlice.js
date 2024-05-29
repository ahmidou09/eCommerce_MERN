import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtil";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  wishListItems: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
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
      }

      return updateCart(state);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    addToWishList(state, action) {
      const item = action.payload;
      if (!state.wishListItems.find((x) => x._id === item._id)) {
        state.wishListItems = [...state.wishListItems, item];
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
    },
    removeFromWishList(state, action) {
      state.wishListItems = state.wishListItems.filter(
        (x) => x._id !== action.payload
      );
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
    },
  },
});

export const { addToCart, removeFromCart, addToWishList, removeFromWishList } =
  cartSlice.actions;
export default cartSlice.reducer;
