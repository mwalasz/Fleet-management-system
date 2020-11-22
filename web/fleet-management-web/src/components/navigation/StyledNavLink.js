import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
    display: block;
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    border-radius: 15px;
    color: ${({ theme }) => theme.thirdColor};
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Regular};
    position: relative;
    margin-bottom: 10px;
    transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;

    svg {
        min-width: 25px;
        margin-right: 10px;
    }
    a {
        font-size: 13px;
        background: ${({ theme }) => theme.primaryColor};
        color: white;
        display: block;
        height: 22px;
        width: 25px;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;

        svg {
            width: 13px;
            height: 13px;
            margin: 0px;
        }
    }
    &:hover {
        color: ${({ theme }) => theme.secondColor};
        font-weight: bold;
    }

    &.active {
        background: ${({ theme }) => theme.primaryBackground};
        color: ${({ theme }) => theme.primaryColor};
        font-weight: bold;
    }
`;

export default StyledNavLink;
