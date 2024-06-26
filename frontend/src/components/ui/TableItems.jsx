import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

const Container = styled.div`
  margin: 2.5rem 0;
  overflow-x: scroll;
`;

const TableStyled = styled.table`
  width: 100%;
  min-height: min-content;
  border-collapse: collapse;
  margin: 2.5rem 0;
  font-size: 1.4rem;
  min-width: 40rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.15);
`;

const Thead = styled.thead`
  background-color: var(--color-grey-1);
  color: var(--color-white);
  text-align: left;
`;

const Th = styled.th`
  padding: 1rem 1.5rem;
  cursor: pointer;

  .columnTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;

    .sortIcon {
      color: var(--color-white);
      flex-direction: column;
      display: flex;
      align-items: center;
      width: 2.2rem;
      height: 2.2rem;
      transform: translateY(1px);

      svg {
        display: none;
        font-size: 1.7rem;
      }
    }
  }

  &:not(:last-child) {
    border-right: 1px solid var(--color-white);
  }

  &:hover .sortIcon svg {
    display: block;
  }
`;

const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid var(--color-gray-1);
    text-align: left;

    td {
      padding: 1rem 1.5rem;
    }
  }

  tr:nth-of-type(even) {
    background-color: var(--color-grey-2);
  }

  tr:last-of-type {
    border-bottom: 2px solid var(--color-red-1);
  }
`;

const PaginationWrapper = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.$isActive ? "var(--color-primary-1)" : "var(--color-black)"};
  cursor: pointer;

  &:hover {
    color: var(--color-primary-1);
  }
`;

const PaginationNextPrevious = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  border: none;
`;

const TableItems = ({ data, columns, renderItem, itemPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("fullName");
  const [sortDirection, setSortDirection] = useState("asc");

  const sortedData = [...data].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Container>
      <TableStyled>
        <Thead>
          <tr>
            {columns.map((column) => (
              <Th key={column.key} onClick={() => handleSort(column.key)}>
                <span className="columnTitle">
                  {column.title}{" "}
                  <span className="sortIcon">
                    <MdArrowDropUp />
                    <MdArrowDropDown />
                  </span>
                </span>
              </Th>
            ))}
          </tr>
        </Thead>
        <Tbody>{currentItems.map((item) => renderItem(item))}</Tbody>
      </TableStyled>

      {data.length > 0 && totalPages > 1 && (
        <PaginationWrapper>
          <PaginationNextPrevious
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrPrevious />
          </PaginationNextPrevious>
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            if (totalPages > 5) {
              if (page <= 2 || page > totalPages - 2) {
                return (
                  <PaginationButton
                    key={page}
                    $isActive={page === currentPage}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </PaginationButton>
                );
              }
              if (page === 3) {
                return <span key="ellipsis">...</span>;
              }
            } else {
              return (
                <PaginationButton
                  key={page}
                  $isActive={page === currentPage}
                  onClick={() => paginate(page)}
                >
                  {page}
                </PaginationButton>
              );
            }
            return null;
          })}
          <PaginationNextPrevious
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <GrNext />
          </PaginationNextPrevious>
        </PaginationWrapper>
      )}
    </Container>
  );
};

export default TableItems;
