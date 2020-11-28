import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const ButtonsWrapper = styled.div`
    display: flex;
    position: fixed;
    bottom: 200px;
    align-self: center;
`;

const NewItemBottomButtons = ({ resetForm, onSubmit }) => (
    <ButtonsWrapper>
        <Button wide rounded accept margin="0px 20px" onClick={onSubmit}>
            DODAJ
        </Button>
        <Button
            wide
            rounded
            cancel
            margin="0px 20px"
            type="button"
            onClick={resetForm}
        >
            ANULUJ
        </Button>
    </ButtonsWrapper>
);

export default NewItemBottomButtons;
