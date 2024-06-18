import React, { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormFields = ({ fields, formFields, handleInputChange }) => {
  const [showPassword, setShowPassword] = useState({});

  const togglePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return fields.map((field) => (
    <FormField key={field.id}>
      <div
        className={`input-wrapper ${formFields[field.id] ? "has-content" : ""}`}
      >
        {field.type === "file" ? (
          <input
            type="file"
            id={field.id}
            required={field.required}
            multiple={field.multiple}
            onChange={handleInputChange}
            accept="image/*"
          />
        ) : (
          <input
            type={
              field.type === "password" && showPassword[field.id]
                ? "text"
                : field.type
            }
            id={field.id}
            required={field.required}
            value={formFields[field.id]}
            onChange={handleInputChange}
          />
        )}
        <label htmlFor={field.id}>
          {field.label}{" "}
          {field.required && (
            <span style={{ color: "var(--color-primary-1)" }}>*</span>
          )}
        </label>
        {field.type === "password" && (
          <span
            className="password-toggle"
            onClick={() => togglePasswordVisibility(field.id)}
          >
            {showPassword[field.id] ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
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
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: var(--color-grey-4);
    &:hover {
      color: var(--color-primary-2);
    }
  }
`;

export default FormFields;
