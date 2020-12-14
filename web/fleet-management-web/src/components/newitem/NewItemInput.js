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

const NewItemInput = (props) => {
    const {
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
        minToday,
    } = props;
    return (
        <ErrorWrapper errors={errors} touched={touched}>
            <StyledInput
                {...props}
                error={errors && touched}
                wide={wide}
                placeholder={placeholder}
                type={type}
                name={name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                caps={caps}
                min={minToday && getTodayDate()}
            />
        </ErrorWrapper>
    );
};

const getTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
};

export default NewItemInput;
