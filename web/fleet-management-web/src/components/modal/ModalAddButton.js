import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const StyledButton = styled(Button)`
    position: absolute;
    right: 0;
    top: 0;
    margin: 65px;
`;

const ModalAddButton = (props) => {
    const { onClick, text } = props;
    return (
        <StyledButton accept onClick={onClick} {...props}>
            {text ? text : 'dodaj'}
        </StyledButton>
    );
};

export default ModalAddButton;
