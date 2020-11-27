import React from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Select as MaterialUISelect } from '@material-ui/core';

const Select = ({ options, onChange, value, onClick, disabled }) => {
    return (
        <Wrapper>
            <StyledFormControl>
                <MaterialUISelect
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                >
                    {options.map((option) => (
                        <StyledMenuItem value={option}>{option}</StyledMenuItem>
                    ))}
                </MaterialUISelect>
                <StyledFormHelperText>Rola użytkownika</StyledFormHelperText>
            </StyledFormControl>
        </Wrapper>
    );
};

Select.propTypes = {};

export default Select;

const StyledMenuItem = styled(MenuItem)``;

const StyledFormHelperText = styled(FormHelperText)`
    margin-top: 10px;
`;

const StyledFormControl = styled(FormControl)`
    height: 100%;
    * {
        height: 100%;
    }
    .MuiSelect-selectMenu {
        padding: 0px 35px 0 10px;
        font-size: ${({ theme }) => theme.font.S} !important;
        font-weight: ${({ theme }) => theme.font.Regular} !important;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    }
    .MuiInput-underline:before,
    .MuiInput-underline:after {
        display: none;
    }
    .MuiSelect-root,
    .MuiSelect-select {
        background: ${({ theme }) => theme.primaryBackground};
        padding: 20px;
        color: ${({ theme }) => theme.primaryColor};
    }
    .MuiSelect-icon {
        color: ${({ theme }) => theme.primaryColor};
    }
`;

const StyledLabel = styled.label`
    font-size: ${({ theme }) => theme.font.S};
    font-weight: ${({ theme }) => theme.font.Light};
    background: ${({ theme }) => theme.primaryBackground};
    border-radius: 15px;
    color: ${({ theme }) => theme.primaryColor};
    height: 100%;
    padding: 10px 20px;
    padding-right: 0px;
    padding-left: 12px;
`;

const Wrapper = styled.div`
    height: 38px;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
`;
