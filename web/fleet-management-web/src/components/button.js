import styled, { css } from 'styled-components';

const Button = styled.button`
    font-size: 10px;
    color: 'white';
    font-weight: 'bold';
    margin: '0px';
    background: 'blue';
    padding: 8px 25px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    cursor: pointer;

    ${({ disabled }) =>
        disabled &&
        css`
            color: gray;
            cursor: not-allowed;
        `}

    ${({ big }) =>
        big &&
        css`
            width: 100%;
        `}
`;

export default Button;
