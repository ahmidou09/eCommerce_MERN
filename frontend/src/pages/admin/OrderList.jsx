import React from "react";
import styled from "styled-components";
import { useGetOrdersQuery } from "../../redux/slices/ordersApiSlice";
import { truncateString } from "../../utils/utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import TableItems from "../../components/ui/TableItems";
import Paginate from "../../components/ui/Paginate";
import Meta from "../../components/ui/Meta";

function OrderList() {
  const { pageNumber } = useParams();
  const basePath = "/admin/orders";
  const {
    data,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetOrdersQuery({ pageNumber });

  const columns = [
    { key: "_id", title: "Order ID" },
    { key: "image", title: "Image" },
    { key: "createdAt", title: "Date" },
    { key: "name", title: "Name" },
    { key: "user", title: "User" },
    { key: "isPaid", title: "Paid" },
    { key: "isDelivered", title: "Delivered" },
    { key: "totalPrice", title: "Total Price" },
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
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>{truncateString(order.orderItems[0].name, 10)}</td>
      <td>{truncateString(order.user.name, 10)}</td>
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
        <Skeleton count={10} height={50} style={{ marginBottom: "2rem" }} />
      ) : errorOrders ? (
        <div>Error: {errorOrders.message}</div>
      ) : (
        <>
          <h2>Orders</h2>
          <Meta title="Admin | Orders List" />
          <TableItems
            data={data.orders}
            columns={columns}
            renderItem={renderItem}
            itemPerPage={data.orders.length}
          />
          <Paginate pages={data.pages} page={data.page} basePath={basePath} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 65vh;

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

export default OrderList;
