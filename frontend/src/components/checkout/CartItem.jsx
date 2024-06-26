import React from "react";
import styled from "styled-components";

const CartItem = ({ item }) =>
  item.countInStock > 0 && (
    <tr key={item._id}>
      <Td>
        <ProductImage src={item.image} alt={item.name} />
      </Td>
      <Td>{item.name}</Td>
      <Td>
        {item.quantity}
        {"×"}
        {item.price}
      </Td>
    </tr>
  );

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-2);
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export default CartItem;
