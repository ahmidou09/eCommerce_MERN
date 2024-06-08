import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  saveSheppingAddress,
  savePaymentMethod,
} from "../redux/slices/cartSlice";

import { Link, useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import CartItem from "../components/Checkout/CartItem";
import ShippingForm from "../components/Checkout/ShippingForm";
import PaymentForm from "../components/Checkout/PaymentForm";
import { clearCart } from "../redux/slices/cartSlice";
import { useCreateOrderMutation } from "../redux/slices/ordersApiSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    cartItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();

  const [shippingFormFields, setShippingFormFields] = useState({
    name: shippingAddress.name || "",
    phone: shippingAddress.phone || "",
    email: shippingAddress.email || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  const [paymentFormFields, setPaymentFormFields] = useState();

  const [saveShipping, setSaveShipping] = useState(false);

  const handleShippingInputChange = (e) => {
    const { id, value } = e.target;
    setShippingFormFields({ ...shippingFormFields, [id]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { id, value } = e.target;
    setPaymentFormFields({ ...paymentFormFields, [id]: value });
  };

  const handleCheckboxChange = (e) => {
    setSaveShipping(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saveShipping) {
      dispatch(saveSheppingAddress(shippingFormFields));
    }

    dispatch(savePaymentMethod(paymentFormFields));

    try {
      const res = await createOrder({
        cartItems,
        shipping: shippingFormFields,
        payment: paymentFormFields,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCart());
      navigate(`/order/${res._id}`);
      toast.success("Order created successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Link to="/">Home</Link> / <span>Checkout</span>
      </Breadcrumb>
      <CheckoutFormContainer>
        <CheckoutForm onSubmit={handleSubmit}>
          <ShippingForm
            formFields={shippingFormFields}
            handleInputChange={handleShippingInputChange}
            saveShipping={saveShipping}
            handleCheckboxChange={handleCheckboxChange}
          />
          <PaymentFormContainer>
            <Table>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </tbody>
            </Table>
            <CartTotal style={{ marginBottom: "2rem", paddingLeft: "2rem" }} />
            <PaymentForm
              formFields={paymentFormFields}
              handleInputChange={handlePaymentInputChange}
            />
            {isError && "something went wrong"}
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "ordering..." : "Proceed to Confirmation"}
            </SubmitButton>
          </PaymentFormContainer>
        </CheckoutForm>
      </CheckoutFormContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 120rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
`;

const CheckoutFormContainer = styled.div``;

const Breadcrumb = styled.div`
  margin-bottom: 4rem;
  padding: 1rem;
  color: var(--color-grey-1);

  span {
    color: var(--color-black);
  }
`;

const CheckoutForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 8rem;
`;

const PaymentFormContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s;
  width: 50%;
  align-self: center;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

export default Checkout;
