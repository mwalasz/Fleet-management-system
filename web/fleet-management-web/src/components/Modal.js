import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Heading from './Heading';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL, userRoles } from '../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import NewItemErrorText from './newitem/NewItemErrorText';
import { HeadingWrapper } from './newitem/FormComponents';

const ExitIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    cursor: pointer;
`;

const StyledWrapper = styled.div`
    border-left: 10px solid ${({ theme }) => theme.primaryColor};
    z-index: 999;
    position: fixed;
    display: flex;
    padding: 50px 90px;
    flex-direction: column;
    right: 0;
    top: 0;
    height: 100vh;
    width: 680px;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
    transition: transform 0.25s ease-in-out;

    ${({ wide }) =>
        wide &&
        css`
            width: 50vw;
        `}

    ${({ ultraWide }) =>
        ultraWide &&
        css`
            width: 65vw;
        `}
`;

const Content = styled.div``;

const StyledSpinner = styled(FontAwesomeIcon)`
    margin-left: 10px;
    color: ${({ theme }) => theme.primaryColor};
`;

const Modal = ({
    isVisible,
    handleClose,
    children,
    wide,
    ultraWide,
    title,
    error,
    isLoading,
}) => {
    return (
        <>
            <StyledWrapper
                isVisible={isVisible}
                wide={wide}
                ultraWide={ultraWide}
            >
                <Content>
                    <ExitIcon icon={faTimes} onClick={handleClose} />
                    <HeadingWrapper>
                        <Heading big>
                            {title}
                            {isLoading && (
                                <StyledSpinner icon={faSpinner} spin />
                            )}
                        </Heading>
                        {error !== '' ? (
                            <NewItemErrorText>{error}</NewItemErrorText>
                        ) : (
                            <span>&nbsp;&nbsp;</span>
                        )}
                    </HeadingWrapper>
                    {children}
                </Content>
            </StyledWrapper>
        </>
    );
};

export default Modal;
