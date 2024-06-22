import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { generatePaginationPath } from "../../utils/utils";

const Paginate = ({ pages, page, basePath, keyword = "" }) => {
  return (
    pages > 1 && (
      <PaginationContainer>
        {[...Array(pages).keys()].map((x) => (
          <PaginationItem
            key={x + 1}
            to={
              keyword
                ? `${basePath}/search/${keyword}/page/${x + 1}`
                : generatePaginationPath(basePath, x + 1)
            }
            className={x + 1 === page ? "active" : ""}
          >
            {x + 1}
          </PaginationItem>
        ))}
      </PaginationContainer>
    )
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationItem = styled(Link)`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid var(--color-grey-2);
  border-radius: 4px;
  background-color: var(--color-white-2);
  color: var(--color-primary-2);
  text-decoration: none;
  cursor: pointer;

  &.active {
    background-color: var(--color-primary-1);
    color: var(--color-white-2);
  }

  &:hover {
    background-color: var(--color-white-2);
    color: var(--color-primary-2);
  }

  &.active:hover {
    background-color: var(--color-primary-2);
    color: var(--color-white-2);
  }
`;

export default Paginate;
