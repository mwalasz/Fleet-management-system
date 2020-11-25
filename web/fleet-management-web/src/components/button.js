import styled, { css } from 'styled-components';

const Button = styled.button`
    font-size: ${({ theme }) => theme.font.S};
    color: white;
    font-weight: ${({ theme }) => theme.font.Regular};
    margin: ${({ margin }) => margin || '0px'};
    background: ${({ theme }) => theme.primaryColor};
    padding: 8px 25px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    cursor: pointer;

    svg {
        margin-right: 10px;
        font-size: ${({ theme }) => theme.font.XS};
    }

    ${({ secondary }) =>
        secondary &&
        css`
            background: ${({ theme }) => theme.primaryColor};
            color: ${({ theme }) => theme.secondColor};
            &:hover {
                color: ${({ theme }) => theme.fourthColor};
            }
        `}

    ${({ third }) =>
        third &&
        css`
            background: none;
            color: ${({ theme }) => theme.secondColor};
            padding: 0px 25px;
            &:focus {
                outline: none;
            }
            &:hover {
                color: ${({ theme }) => theme.primaryColor};
            }
        `}
   
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
            line-height: ${({ theme }) => theme.font.XL};
        `}
`;

export default Button;
