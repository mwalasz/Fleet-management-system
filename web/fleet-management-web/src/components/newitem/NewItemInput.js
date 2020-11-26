import React from 'react';
import styled from 'styled-components';
import FormInput from '../FormInput';
import NewItemText from './NewItemText';

const InputWithError = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(FormInput)`
    margin-top: 30px;
`;

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
    <InputWithError>
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
        {errors && touched ? (
            <NewItemText>{errors}</NewItemText>
        ) : (
            <span>&nbsp;&nbsp;</span>
        )}
    </InputWithError>
);

export default NewItemInput;
