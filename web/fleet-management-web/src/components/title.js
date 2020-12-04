import styled, { css } from 'styled-components';

const Title = styled.h2`
    margin: '0px';
    font-size: ${({ theme }) => theme.font.XXXL};
    color: ${({ theme }) => theme.primaryColor};
    font-weight: ${({ theme }) => theme.font.Bold};
    display: flex;
    align-items: center;
`;

export default Title;
