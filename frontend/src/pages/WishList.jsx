import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../redux/slices/cartSlice";
import { removeFromWishList } from "../redux/slices/wishListSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishList);
  console.log(wishListItems);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishList(item._id));
  };

  const handleRemoveFromWishList = (id) => {
    dispatch(removeFromWishList(id));
  };

  return (
    <Container>
      <h2>Wish List</h2>
      {wishListItems.length === 0 ? (
        <p>Your wish list is empty</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {wishListItems.map((item) => (
              <tr key={item._id}>
                <Td>
                  <Link to={`/products/${item._id}`}>
                    <ProductImage src={item.image} alt={item.name} />
                  </Link>
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  {item.countInStock > 0 ? (
                    <Button onClick={() => handleAddToCart(item)}>
                      <FaCartPlus /> Add to Cart
                    </Button>
                  ) : (
                    <span>Out of Stock</span>
                  )}
                  <Button onClick={() => handleRemoveFromWishList(item._id)}>
                    <FaTrash /> Remove
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-0);
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-0);

  span {
    margin-right: 2rem;
    font-weight: 500;
    color: var(--color-primary-1);
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const Button = styled.button`
  background-color: var(--color-primary-1);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  padding: 0.8rem 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-2);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default WishList;
