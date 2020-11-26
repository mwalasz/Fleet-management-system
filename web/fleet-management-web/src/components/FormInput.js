import styled, { css } from 'styled-components';

const FormInput = styled.input`
    padding: 15px 30px;
    font-size: ${({ theme }) => theme.font.S};
    font-weight: ${({ theme }) => theme.font.Regular};
    background-color: ${({ theme }) => theme.primaryBackground};
    border: none;
    border-radius: 20px;
    color: ${({ theme }) => theme.primaryColor};
    outline: none;
    cursor: pointer;

    ::placeholder {
        text-transform: lowercase;
        letter-spacing: 1px;
        outline: none;
        color: ${({ theme }) => theme.primaryColor};
    }

    ${({ search }) =>
        search &&
        css`
            padding: 10px 20px 10px 40px;
            font-size: ${({ theme }) => theme.font.XS};
            background-size: 15px;
            background-position: 15px 50%;
            background-repeat: no-repeat;
        `}

    ${({ wide }) =>
        wide &&
        css`
            width: 250px;
        `}
`;

export default FormInput;
