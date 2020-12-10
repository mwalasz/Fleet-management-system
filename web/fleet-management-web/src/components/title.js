import styled, { css } from 'styled-components';

const Title = styled.h2`
    margin: '0px';
    font-size: ${({ theme }) => theme.font.XXL};
    color: 'black';
    font-weight: ${({ theme }) => theme.font.Bold};
    display: flex;
    align-items: center;

    ${({ margin }) =>
        margin &&
        css`
            margin-right: 20px;
        `}

    ${({ big }) =>
        big &&
        css`
            font-size: ${({ theme }) => theme.font.XXXL};
            color: ${({ theme }) => theme.primaryColor};
        `}
`;

export default Title;
