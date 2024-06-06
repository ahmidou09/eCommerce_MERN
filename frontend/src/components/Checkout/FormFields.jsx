import React from "react";
import styled from "styled-components";

const FormFields = ({ fields, formFields, handleInputChange }) => {
  return fields.map((field) => (
    <FormField key={field.id}>
      <div
        className={`input-wrapper ${formFields[field.id] ? "has-content" : ""}`}
      >
        <input
          type={field.type}
          id={field.id}
          required
          value={formFields[field.id]}
          onChange={handleInputChange}
        />
        <label htmlFor={field.id}>{field.label}</label>
      </div>
    </FormField>
  ));
};

const FormField = styled.div`
  margin-bottom: 3rem;
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
  }
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--color-grey-4);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
  input {
    padding: 1rem 0.5rem;
    border: none;
    border-bottom: 1px solid var(--color-grey-2);
    border-radius: 5px;
    transition: all 0.3s ease;
    &:focus {
      outline: none;
      border-bottom: 1px solid var(--color-primary-2);
    }
  }
  .input-wrapper:focus-within label,
  .input-wrapper.has-content label {
    color: var(--color-primary-2);
    top: -20%;
    font-size: 1.2rem;
  }
`;

export default FormFields;
