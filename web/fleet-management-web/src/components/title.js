import styled, { css } from 'styled-components';

const Title = styled.h2`
    margin: '0px';
    font-size: '10px';
    color: 'black';
    font-weight: 800;
    display: flex;
    align-items: center;

    svg {
        margin-right: 10px !important;
    }
    ${({ secondary }) =>
        secondary &&
        css`
            font-size: ${({ theme }) => theme.font.L};
        `}
`;

export default Title;
