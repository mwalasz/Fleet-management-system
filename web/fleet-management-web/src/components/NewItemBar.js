import React from 'react';
import styled from 'styled-components';
import Heading from '../components/Heading';
import { connect } from 'react-redux';
import { theme } from '../utils/theme';

const StyledWrapper = styled.div`
    border-left: 10px solid ${({ theme }) => theme.primaryColor};
    z-index: 9999;
    position: fixed;
    display: flex;
    padding: 100px 90px;
    flex-direction: column;
    right: 0;
    top: 0;
    height: 100vh;
    width: 680px;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
    transition: transform 0.25s ease-in-out;
`;

// const StyledForm = styled(Form)`
//     display: flex;
//     flex-direction: column;
// `;

// const StyledTextArea = styled(Input)`
//     margin: 30px 0 100px;
//     border-radius: 20px;
//     height: 30vh;
// `;

// const StyledInput = styled(Input)`
//     margin-top: 30px;
// `;

const NewItemBar = ({ isVisible, addItem, handleClose }) => (
    <StyledWrapper isVisible={isVisible}>
        <Heading big>Create new item</Heading>
    </StyledWrapper>
);

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(NewItemBar);
