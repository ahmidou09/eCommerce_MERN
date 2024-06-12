import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../redux/slices/ordersApiSlice";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";
import Loading from "../components/Loading";
import Errors from "../components/Errors";
import styled from "styled-components";

const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loading height={"20rem"} />
  ) : isError ? (
    <Errors message="An error occurred" />
  ) : (
    <Container>
      <OrderContainer>
        <OrderDetailsWrapper>
          <OrderHeader>
            Order: <span>{orderId}</span>{" "}
          </OrderHeader>
          <Section>
            <SectionHeader>Shipping</SectionHeader>
            <Detail>
              <strong>Name:</strong> {orderDetails.user.name}
            </Detail>
            <Detail>
              <strong>Email:</strong> {orderDetails.user.email}
            </Detail>
            <Detail>
              <strong>Address:</strong> {orderDetails.shippingAddress.address}{" "}
              {orderDetails.shippingAddress.city}{" "}
              {orderDetails.shippingAddress.postalCode}{" "}
              {orderDetails.shippingAddress.country}
            </Detail>
          </Section>
          <Section>
            {renderStatus(orderDetails.isDelivered, orderDetails.isPaid)}
          </Section>

          <Section>
            <SectionHeader>Payment Method</SectionHeader>
            <Detail>
              <strong>Method:</strong>
              <span>
                {orderDetails.paymentMethod === "paypal" ? (
                  <>
                    Paypal <FaPaypal />
                  </>
                ) : (
                  <>
                    <FaRegCreditCard />
                    Credit Card
                  </>
                )}
              </span>
            </Detail>
          </Section>
          <Section>
            <SectionHeader>Order Items</SectionHeader>
            {orderDetails.orderItems.map((item, index) => (
              <Link to={`/products/${item.product}`} key={index}>
                <ItemDetail key={index}>
                  <ItemImg src={item.image} alt={item.name} />
                  <ItemName>{truncateString(item.name, 18)}</ItemName>
                  <ItemQuantity>
                    {item.quantity} x ${item.price.toFixed(2)} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </ItemQuantity>
                </ItemDetail>
              </Link>
            ))}
          </Section>
        </OrderDetailsWrapper>
        <OrderSummaryWrapper>
          <OrderSummary>
            <SummaryHeader>Order Summary</SummaryHeader>
            <SummaryDetail>
              <strong>Items:</strong>{" "}
              <span>${orderDetails.itemsPrice.toFixed(2)}</span>
            </SummaryDetail>
            <SummaryDetail>
              <strong>Shipping:</strong>
              <span>${orderDetails.shippingPrice.toFixed(2)}</span>
            </SummaryDetail>
            <SummaryDetail>
              <strong>Tax:</strong>{" "}
              <span>${orderDetails.taxPrice.toFixed(2)}</span>
            </SummaryDetail>
            <SummaryTotal>
              <strong>Total:</strong>
              <span>${orderDetails.totalPrice.toFixed(2)}</span>
            </SummaryTotal>
          </OrderSummary>
        </OrderSummaryWrapper>
      </OrderContainer>
    </Container>
  );
};

const truncateString = (str, num) => {
  return str.length > num ? str.slice(0, num) + "..." : str;
};

const renderStatus = (isDelivered, isPaid) => {
  return (
    <OrderStatus>
      <h2>Delivery status</h2>
      <Status className={isDelivered ? "delivered" : "not-delivered"}>
        {isDelivered
          ? "The product was delivered successfully "
          : "Not delivered"}
      </Status>
      <h2>Payment status</h2>
      <Status className={isPaid ? "paid" : "not-paid"}>
        {isPaid ? "Payment completed" : "Not paid"}
      </Status>
    </OrderStatus>
  );
};

const Container = styled.div`
  max-width: 120rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8rem;
`;

const OrderDetailsWrapper = styled.div`
  flex: 1;
  padding: 2rem;
`;

const OrderSummaryWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-grey-5);
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-grey-5);
`;

const SectionHeader = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`;

const Detail = styled.p`
  font-size: 1.6rem;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const OrderStatus = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

const Status = styled.div`
  padding: 1.2rem;
  border-radius: 5px;
  color: var(--color-white);
  margin-bottom: 3rem;

  &.delivered {
    background-color: var(--color-green-1);
  }

  &.not-delivered {
    background-color: var(--color-red-1);
  }

  &.paid {
    background-color: var(--color-green-1);
  }

  &.not-paid {
    background-color: var(--color-red-1);
  }
`;

const ItemDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ItemImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 1rem;
`;
const ItemName = styled.span`
  font-size: 1.6rem;
`;

const ItemQuantity = styled.span`
  font-size: 1.8rem;
`;

const OrderSummary = styled.div`
  padding: 1rem;
  border-radius: 5px;
`;

const SummaryHeader = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const SummaryDetail = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`;

const SummaryTotal = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
`;

export default Order;
