import React from 'react';
import styled, { css } from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import { Input, Select as MaterialUISelect } from '@material-ui/core';

const Select = ({
    options,
    handleChange,
    value,
    onClick,
    handleBlur,
    short,
}) => {
    return (
        <StyledSelect
            value={value}
            onChange={handleChange}
            onClick={onClick}
            onBlur={handleBlur}
            short={short}
        >
            {options.map((option) => (
                <StyledMenuItem value={option}>{option}</StyledMenuItem>
            ))}
        </StyledSelect>
    );
};

export default Select;

const StyledSelect = styled(MaterialUISelect)`
    width: 350px;
    border-radius: 20px;
    background: ${({ theme }) => theme.primaryBackground};
    height: 48px;
    padding: 10px 20px;
    font-size: ${({ theme }) => theme.font.XS} !important;
    font-weight: ${({ theme }) => theme.font.Regular} !important;
    color: ${({ theme }) => theme.primaryColor} !important;

    ${({ short }) =>
        short &&
        css`
            width: 200px;
            margin-left: 15px;
        `}

    &:hover {
    }
    &.MuiFilledInput-underline:before,
    &.MuiFilledInput-underline:after {
        display: none;
    }
`;

const StyledMenuItem = styled(MenuItem)``;
