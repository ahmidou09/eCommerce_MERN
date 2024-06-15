import React from "react";
import { useGetMyOrdersQuery } from "../../redux/slices/ordersApiSlice";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { truncateString } from "../../utils/cartUtil";

const MyOrders = () => {
  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  if (loadingOrders) {
    return (
      <SkeletonContainer>
        {" "}
        <Skeleton count={5} height={50} style={{ marginBottom: "2rem" }} />
      </SkeletonContainer>
    );
  }

  if (errorOrders) {
    return <div>Error: {errorOrders.message}</div>;
  }

  return (
    <Container>
      <h2>My Orders</h2>
      <OrdersTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Total Price</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td> {truncateString(order._id, 10)}</td>
              <td>
                <img
                  src={order.orderItems[0].image}
                  alt={order.orderItems[0].name}
                  width="50"
                />
              </td>
              <td>{truncateString(order.orderItems[0].name, 15)}</td>
              <td>
                {order.isPaid ? (
                  new Date(order.paidAt).toLocaleDateString()
                ) : (
                  <span>✕</span>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  new Date(order.deliveredAt).toLocaleDateString()
                ) : (
                  <span>✕</span>
                )}
              </td>

              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button>
                  <Link to={`/orders/${order._id}`}>detail </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 85vh;
  padding: 2rem;
`;

const SkeletonContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 85vh;
  padding: 2rem;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  th,
  td {
    border: 1px solid var(--color-grey-1);
    padding: 1rem;
    text-align: left;

    span {
      font-weight: 600;
      color: var(--color-primary-1);
    }

    button {
      background-color: var(--color-grey-2);
      border: none;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: var(--color-grey-1);
      }
    }
  }

  th {
    background-color: var(--color-grey-2);
  }

  img {
    max-width: 50px;
  }
`;

export default MyOrders;
