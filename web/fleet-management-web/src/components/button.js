import styled, { css } from 'styled-components';

const Button = styled.button`
    font-size: ${({ theme }) => theme.font.S};
    font-weight: ${({ theme }) => theme.font.Bold};
    margin: ${({ margin }) => margin || '0px'};
    background: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondColor};
    padding: 8px 25px;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    text-transform: lowercase;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.fourthColor};
    }

    &:focus {
        outline: none;
    }

    svg {
        margin-right: 10px;
        font-size: ${({ theme }) => theme.font.XS};
    }

    ${({ secondary }) =>
        secondary &&
        css`
            border: 2px solid ${({ theme }) => theme.primaryColor};
            background: ${({ theme }) => theme.primaryColor};
            padding: 8px 25px;
            &:focus {
                outline: none;
            }
            &:hover {
                color: ${({ theme }) => theme.secondColor};
                background: ${({ theme }) => theme.primaryBackground};
            }
        `}

    ${({ selected }) =>
        selected &&
        css`
            background: ${({ theme }) => theme.primaryBackground};
            padding: 8px 25px;
            border: 2px solid ${({ theme }) => theme.primaryColor};
            &:focus {
            }
        `}

    ${({ cancel }) =>
        cancel &&
        css`
            background: ${({ theme }) => theme.primaryBackground};
            color: ${({ theme }) => theme.secondColor};
            padding: 0px 25px;
            &:focus {
                outline: 'none';
            }
            &:hover {
                background: ${({ theme }) => theme.red};
                color: ${({ theme }) => theme.fourthColor};
            }
        `}

    ${({ accept }) =>
        accept &&
        css`
            background: ${({ theme }) => theme.primaryColor};
            color: ${({ theme }) => theme.fourthColor};
            padding: 8px 25px;
            &:focus {
                outline: 'none';
            }
            &:hover {
                background: ${({ theme }) => theme.green};
                color: ${({ theme }) => theme.fourthColor};
            }
        `}
   
  ${({ disabled }) =>
        disabled &&
        css`
            color: white;
            cursor: not-allowed;
        `}

  ${({ big }) =>
        big &&
        css`
            width: 100%;
            line-height: ${({ theme }) => theme.font.XL};
        `}

    ${({ wide }) =>
        wide &&
        css`
            width: 200px;
            line-height: ${({ theme }) => theme.font.XL};
        `}

    ${({ ultraWide }) =>
        ultraWide &&
        css`
            width: 350px;
            line-height: ${({ theme }) => theme.font.XL};
        `}

    ${({ rounded }) =>
        rounded &&
        css`
            border-radius: 50px;
        `}
`;

export default Button;
