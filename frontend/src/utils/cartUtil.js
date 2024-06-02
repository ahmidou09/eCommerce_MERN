export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate Items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      if (item.countInStock === 0) {
        item.price = 0;
      }

      return acc + item.price * item.quantity;
    }, 0)
  );

  // Calculate shipping price
  state.shippingPrice =
    state.itemsPrice > 100 || +state.itemsPrice === 0 ? 0 : 10;

  console.log("itemsPrice", +state.itemsPrice);
  console.log("shippingPrice", state.shippingPrice);

  // Calculate tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate total price
  state.totalPrice = Number(
    parseFloat(state.itemsPrice) +
      parseFloat(state.shippingPrice) +
      parseFloat(state.taxPrice)
  ).toFixed(2);

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
