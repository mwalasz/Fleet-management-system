import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Spinner = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
    margin: auto 10px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
