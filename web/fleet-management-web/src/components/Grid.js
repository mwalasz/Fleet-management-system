import styled, { css } from 'styled-components';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledGridRow = ({ heading, text, icon }) => (
    <StyledRow
        icon={icon}
        container
        direction="row"
        justify={icon ? 'center' : 'space-between'}
        alignItems="center"
    >
        {icon ? (
            <StyledIcon icon={icon} size="s" />
        ) : (
            <>
                <RowHeading>{`${heading}:`}</RowHeading>
                <RowText>{text}</RowText>
            </>
        )}
    </StyledRow>
);

export const StyledGrid = ({ children }) => (
    <StyledGridComponent
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
    >
        {children}
    </StyledGridComponent>
);

const StyledRow = styled(Grid)`
    padding: 10px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.primaryColor};

    ${({ icon }) =>
        icon &&
        css`
            padding: 15px 20px;
            background-color: ${({ theme }) => theme.primaryBackground};
        `}
`;

const StyledGridComponent = styled(Grid)``;

const RowText = styled.div`
    font-size: ${({ theme }) => theme.font.M};
    font-weight: ${({ theme }) => theme.font.Regular};
`;

const RowHeading = styled.div`
    font-size: ${({ theme }) => theme.font.L};
    font-weight: ${({ theme }) => theme.font.Bold};
    color: ${({ theme }) => theme.primaryColor};
    text-transform: lowercase;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.primaryColor};
`;
