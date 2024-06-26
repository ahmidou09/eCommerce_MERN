import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../redux/slices/cartSlice";
import {
  removeFromWishList,
  clearWishList,
} from "../redux/slices/wishListSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaCartPlus } from "react-icons/fa";
import Meta from "../components/ui/Meta";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishListItems } = useSelector((state) => state.wishList);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishList(item._id));
  };

  const handleRemoveFromWishList = (id) => {
    dispatch(removeFromWishList(id));
  };

  const handleMoveAllToCart = () => {
    dispatch(clearWishList());
  };

  return (
    <Container>
      <Header>
        <Meta title="Wish List" />
        <h2>Wishlist ({wishListItems.length})</h2>
        <MoveAllButton onClick={handleMoveAllToCart}>
          clear wish list <FaTrash />
        </MoveAllButton>
      </Header>
      {wishListItems.length === 0 ? (
        <EmptyMessage>Your wish list is empty</EmptyMessage>
      ) : (
        <ItemsGrid>
          {wishListItems.map((item) => (
            <ItemCard key={item._id}>
              {item.discount && (
                <DiscountBadge>-{item.discount}%</DiscountBadge>
              )}
              <Link to={`/products/${item._id}`}>
                <ProductImage src={item.image} alt={item.name} />
              </Link>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>
                  <CurrentPrice>${item.price}</CurrentPrice>
                  {item.oldPrice && <OldPrice>${item.oldPrice}</OldPrice>}
                </ItemPrice>
                <ActionButtons>
                  {item.countInStock > 0 ? (
                    <Button onClick={() => handleAddToCart(item)}>
                      <FaCartPlus /> Add to Cart
                    </Button>
                  ) : (
                    <span style={{ color: "var(--color-primary-1)" }}>
                      Out of Stock
                    </span>
                  )}
                  <span
                    className="delete"
                    onClick={() => handleRemoveFromWishList(item._id)}
                  >
                    <FaTrash />
                  </span>
                </ActionButtons>
              </ItemDetails>
            </ItemCard>
          ))}
        </ItemsGrid>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 65vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const MoveAllButton = styled.button`
  background-color: var(--color-grey-3);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  padding: 1.2rem 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-2);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-grey-1);
`;

const ItemsGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 6rem;
  align-items: center;
`;

const ItemCard = styled.div`
  background-color: var(--color-white);
  border-radius: 10px;
  max-width: 30rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: relative;
  font-size: 1.2rem;

  .delete {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--color-grey-3);
    cursor: pointer;

    svg {
      font-size: 1.8rem;
    }

    &:hover {
      color: var(--color-primary-1);
    }
  }
`;

const DiscountBadge = styled.span`
  background-color: var(--color-primary-1);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
`;

const ProductImage = styled.img`
  width: 85%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  padding: 0.5rem;
`;

const ItemDetails = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-black);
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--color-primary-1);
  margin-right: 0.5rem;
`;

const OldPrice = styled.span`
  font-size: 1.1rem;
  text-decoration: line-through;
  margin-left: 0.5rem;
  color: var(--color-grey-3);
`;

const ActionButtons = styled.div``;

const Button = styled.button`
  background-color: var(--color-primary-2);
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  padding: 1.5rem 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-primary-1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export default WishList;
