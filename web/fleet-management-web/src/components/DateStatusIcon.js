import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faExclamationCircle,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#0D77BB',
        fontSize: theme.typography.pxToRem(15),
        border: '3px solid rgb(54,118,181)',
        maxWidth: '300px',
        textAlign: 'center',
    },
}))(Tooltip);

const StyledStatusIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.green};
    white-space: 'nowrap';
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ warning }) =>
        warning &&
        css`
            color: ${({ theme }) => theme.yellow};
        `};

    ${({ error }) =>
        error &&
        css`
            color: ${({ theme }) => theme.red};
        `};
`;

const DateStatusIcon = ({ warning, error, dateType }) => {
    return (
        <HtmlTooltip
            enterDelay={200}
            leaveDelay={200}
            style={{ fontSize: '20px' }}
            title={
                (warning && `Zbliża się ważna data - ${dateType}!`) ||
                (error && `Minęła ważna data - ${dateType}!`) ||
                'Wszystko w terminie!'
            }
        >
            <p
                style={{
                    whitespace: 'nowrap',
                    overflow: 'hidden',
                    textoverflow: 'ellipsis',
                    fontSize: '16px',
                }}
            >
                <StyledStatusIcon
                    warning={warning}
                    error={error}
                    icon={
                        (warning && faExclamationTriangle) ||
                        (error && faExclamationCircle) ||
                        faCheckCircle
                    }
                />
            </p>
        </HtmlTooltip>
    );
};

export default DateStatusIcon;
