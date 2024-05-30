import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishListItems: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList(state, action) {
      const item = action.payload;
      if (!state.wishListItems.find((x) => x._id === item._id)) {
        state.wishListItems = [...state.wishListItems, item];
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
      toast.success("Product added to wish list!");
    },
    removeFromWishList(state, action) {
      state.wishListItems = state.wishListItems.filter(
        (x) => x._id !== action.payload
      );
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
      toast.success("Product removed from wish list!");
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
