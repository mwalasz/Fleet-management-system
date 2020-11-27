import styled from 'styled-components';

const Heading = styled.h1`
    font-size: ${({ theme, big }) => (big ? theme.font.xl : theme.font.l)};
    font-weight: ${({ theme }) => theme.bold};
`;

export default Heading;
