import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FilterContainer = styled.div`
  width: 20%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem 4rem 0 0;

  .filter_list {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    list-style: none;

    li {
      cursor: pointer;
    }
  }
`;

function Filter() {
  return (
    <FilterContainer>
      <ul className="filter_list">
        <li>
          <Link to="/category/women">Woman’s Fashion </Link>
        </li>
        <li>
          <Link to="/category/man">Man’s Fashion </Link>
        </li>
        <li>
          <Link to="/category/electronics">Electronics</Link>
        </li>
        <li>
          <Link to="/category/lifestyle">Home & Lifestyle</Link>
        </li>
        <li>
          <Link to="/category/medicine">Medicine</Link>
        </li>
        <li>
          <Link to="/category/sports">Sports & Outdoor</Link>
        </li>
        <li>
          <Link to="/category/baby">Baby’s & Toys</Link>
        </li>
        <li>
          <Link to="/category/groceries">Groceries & Pets</Link>
        </li>
        <li>
          <Link to="/category/health">Health & Beauty</Link>
        </li>
      </ul>
    </FilterContainer>
  );
}

export default Filter;
