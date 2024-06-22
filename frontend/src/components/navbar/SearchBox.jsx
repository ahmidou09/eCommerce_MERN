import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const StyledInput = styled.input`
  padding: 0.8rem 5rem 0.8rem 1rem;
  background-color: var(--color-grey-0);
  margin: 0 0.5rem;
  border: none;
  border-radius: 4px;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  padding: 0.5rem 0rem;
  background-color: transparent;
  border: none;
  color: var(--color-primary-2);
  border-radius: 4px;
  cursor: pointer;
  margin-left: -4rem;
`;

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledInput
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="What are you looking for?"
      />
      <StyledButton type="submit">
        <BsSearch />
      </StyledButton>
    </StyledForm>
  );
};

export default SearchBox;
