import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import debounce from "lodash.debounce";

const StyledForm = styled.form`
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 2%;
  }
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

const debouncedNavigateFn = (navigate) =>
  debounce((keyword) => {
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  }, 500);

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const debouncedNavigate = useRef(debouncedNavigateFn(navigate)).current;

  useEffect(() => {
    debouncedNavigate(keyword);
  }, [keyword, debouncedNavigate]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    debouncedNavigate(keyword);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledInput
        type="text"
        name="q"
        onChange={handleChange}
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
