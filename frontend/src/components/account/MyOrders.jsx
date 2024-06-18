import React from "react";
import styled from "styled-components";
import { useGetMyOrdersQuery } from "../../redux/slices/ordersApiSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { truncateString } from "../../utils/cartUtil";
import TableItems from "../ui/TableItems";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  const columns = [
    { key: "_id", title: "Order ID" },
    { key: "image", title: "Image" },
    { key: "name", title: "Name" },
    { key: "isPaid", title: "Paid" },
    { key: "isDelivered", title: "Delivered" },
    { key: "totalPrice", title: "Total Price" },
    { key: "createdAt", title: "Date" },
    { key: "actions", title: "" },
  ];

  const renderItem = (order) => (
    <tr key={order._id}>
      <td>{truncateString(order._id, 10)}</td>
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
          <Link to={`/orders/${order._id}`}>Detail</Link>
        </button>
      </td>
    </tr>
  );

  return (
    <Container>
      {loadingOrders ? (
        <Skeleton count={5} height={50} style={{ marginBottom: "2rem" }} />
      ) : errorOrders ? (
        <div>Error: {errorOrders.message}</div>
      ) : (
        <TableItems data={orders} columns={columns} renderItem={renderItem} />
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 64vh;

  td {
    text-align: left;

    button {
      background-color: var(--color-grey-1);
      border: none;
      border-radius: 5px;
      padding: 0.5rem 1rem;
      cursor: pointer;

      &:hover {
        background-color: var(--color-grey-4);
      }
    }

    span {
      font-weight: 600;
      color: var(--color-primary-1);
    }
  }
`;

export default MyOrders;
