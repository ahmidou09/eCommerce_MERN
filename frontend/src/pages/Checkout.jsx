import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { saveSheppingAddress } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import CartItem from "../components/Checkout/CartItem";
import ShippingForm from "../components/Checkout/ShippingForm";
import PaymentForm from "../components/Checkout/PaymentForm";

const Checkout = () => {
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    name: shippingAddress.name || "",
    phone: shippingAddress.phone || "",
    email: shippingAddress.email || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  const [saveShipping, setSaveShipping] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormFields({ ...formFields, [id]: value });
  };

  const handleCheckboxChange = (e) => {
    setSaveShipping(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saveShipping) {
      dispatch(saveSheppingAddress(formFields));
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
            formFields={formFields}
            handleInputChange={handleInputChange}
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
            <CartTotal style={{ marginTop: "2rem", border: "none" }} />
            <PaymentForm
              formFields={formFields}
              handleInputChange={handleInputChange}
            />
            <SubmitButton type="submit">Proceed to Confirmation</SubmitButton>
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
