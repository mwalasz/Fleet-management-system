import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Input, Select as MaterialUISelect } from '@material-ui/core';

const Select = ({ options, handleChange, value, onClick, handleBlur }) => {
    return (
        <StyledSelect
            value={value}
            onChange={handleChange}
            onClick={onClick}
            onBlur={handleBlur}
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

    &:hover {
    }
    &.MuiFilledInput-underline:before,
    &.MuiFilledInput-underline:after {
        display: none;
    }
`;

const StyledMenuItem = styled(MenuItem)``;
