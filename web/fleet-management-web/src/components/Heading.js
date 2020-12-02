import styled, { css } from 'styled-components';

const Heading = styled.h1`
    font-size: ${({ theme, big }) => (big ? theme.font.xl : theme.font.l)};
    font-weight: ${({ theme }) => theme.bold};
    margin: 5px 0px;

    ${({ centered }) =>
        centered &&
        css`
            text-align: center;
        `}
`;

export default Heading;
