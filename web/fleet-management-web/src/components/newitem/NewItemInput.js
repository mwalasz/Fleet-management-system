import React from 'react';
import styled, { css } from 'styled-components';
import FormInput from '../FormInput';
import NewItemErrorText from './NewItemErrorText';

const InputWithError = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(FormInput)`
    margin-top: 20px;

    ${({ type }) =>
        type === 'text' &&
        css`
            text-transform: capitalize;
        `}

    ${({ caps }) =>
        caps &&
        css`
            text-transform: uppercase;
        `}
`;

export const ErrorWrapper = ({ children, errors, touched }) => (
    <InputWithError>
        {children}
        {errors && touched ? (
            <NewItemErrorText>{errors}</NewItemErrorText>
        ) : (
            <span>&nbsp;&nbsp;</span>
        )}
    </InputWithError>
);

const NewItemInput = ({
    wide,
    handleChange,
    handleBlur,
    errors,
    touched,
    placeholder,
    type,
    name,
    value,
    caps,
}) => (
    <ErrorWrapper errors={errors} touched={touched}>
        <StyledInput
            error={errors && touched}
            wide={wide}
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            value={value}
            caps={caps}
        />
    </ErrorWrapper>
);

export default NewItemInput;
