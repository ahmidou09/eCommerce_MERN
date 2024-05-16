import React from "react";
import styled from "styled-components";

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
        <li>Woman’s Fashion</li>
        <li>Man’s Fashion</li>
        <li>Electronics</li>
        <li>Home & Lifestyle</li>
        <li>Medicine</li>
        <li>Sports & Outdoor</li>
        <li>Baby’s & Toys</li>
        <li>Groceries & Pets</li>
        <li>Health & Beauty</li>
      </ul>
    </FilterContainer>
  );
}

export default Filter;
