import React from 'react';
import styled from 'styled-components';
import FormInput from '../FormInput';
import NewItemErrorText from './NewItemErrorText';

const InputWithError = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(FormInput)`
    margin-top: 30px;
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
        />
    </ErrorWrapper>
);

export default NewItemInput;
