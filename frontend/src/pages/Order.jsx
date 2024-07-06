import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useUpdateOrderToDeliveredMutation,
} from "../redux/slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { FaRegCreditCard, FaPaypal } from "react-icons/fa";
import { truncateString } from "../utils/utils";
import Loading from "../components/ui/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Errors from "../components/ui/Errors";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Meta from "../components/ui/Meta";
import { BASE_URL, UPLOAD_URL } from "../constants";

const Order = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [updateOrderToDelivered, { isLoading: loadingDelivered }] =
    useUpdateOrderToDeliveredMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await updateOrderToDelivered(orderId);
      refetch();
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Skeleton count={12} height={50} style={{ marginBottom: "2rem" }} />
      ) : isError ? (
        <Errors message="An error occurred" style={{ height: "65vh" }} />
      ) : (
        <OrderContainer>
          <Meta title={`Order ${orderId}`} />
          <OrderDetailsWrapper>
            <OrderHeader>
              Order: <span>{orderId}</span>{" "}
            </OrderHeader>
            <Section>
              <SectionHeader>Shipping</SectionHeader>
              <Detail>
                <strong>Name:</strong> {order.user.name}
              </Detail>
              <Detail>
                <strong>Email:</strong> {order.user.email}
              </Detail>
              <Detail>
                <strong>Address:</strong> {order.shippingAddress.address}{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode}{" "}
                {order.shippingAddress.country}
              </Detail>
            </Section>
            <Section>{renderStatus(order.isDelivered, order.isPaid)}</Section>

            <Section>
              <SectionHeader>Payment Method</SectionHeader>
              <Detail>
                <strong>Method:</strong>
                <span>
                  {order.paymentMethod === "paypal" ? (
                    <>
                      Paypal <FaPaypal />
                    </>
                  ) : null}
                  {order.paymentMethod === "creditCard" ? (
                    <>
                      <FaRegCreditCard />
                      Credit Card
                    </>
                  ) : null}
                </span>
              </Detail>
            </Section>
            <Section>
              <SectionHeader>Order Items</SectionHeader>
              {order.orderItems.map((item, index) => (
                <Link to={`/products/${item.product}`} key={index}>
                  <ItemDetail key={index}>
                    <ItemImg
                      src={`${BASE_URL}${UPLOAD_URL}${item.image}`}
                      alt={item.name}
                    />
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
            <Section>
              <OrderSummary>
                <SummaryHeader>Order Summary</SummaryHeader>
                <SummaryDetail>
                  <strong>Items:</strong>{" "}
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </SummaryDetail>
                <SummaryDetail>
                  <strong>Shipping:</strong>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </SummaryDetail>
                <SummaryDetail>
                  <strong>Tax:</strong>{" "}
                  <span>${order.taxPrice.toFixed(2)}</span>
                </SummaryDetail>
                <SummaryTotal>
                  <strong>Total:</strong>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </SummaryTotal>
              </OrderSummary>
            </Section>
            {!order.isPaid && (
              <div>
                {loadingPay && <Loading />}
                {isPending ? (
                  <Skeleton
                    count={2}
                    height={40}
                    style={{ marginBottom: "2rem" }}
                  />
                ) : (
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
              </div>
            )}
            <div>
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <Button
                    onClick={deliverOrderHandler}
                    disabled={loadingDelivered}
                  >
                    {loadingDelivered ? (
                      <Loading height={"1rem"} />
                    ) : (
                      "Marak as delivered"
                    )}
                  </Button>
                )}{" "}
            </div>
          </OrderSummaryWrapper>
        </OrderContainer>
      )}
    </Container>
  );
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
  min-height: 65vh;
  margin: 0 auto;
  padding: 2rem;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
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

const Button = styled.button`
  padding: 1rem 1.5rem;
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

export default Order;
