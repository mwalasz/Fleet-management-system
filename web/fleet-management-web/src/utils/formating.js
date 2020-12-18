import moment from 'moment';
import styled from 'styled-components';
import { getTimeLeftToDate } from './utils';

const errorMessage = 'Błąd!';

export const roundTo = (numOfPlaces, numberToRound) => {
    return numOfPlaces !== 0
        ? parseFloat(numberToRound).toFixed(numOfPlaces)
        : parseFloat(numberToRound);
};

export const formatDurationWithNoStyling = (time) => {
    let toReturn;

    if (time < 60) {
        toReturn = `${time} s`;
    } else if (time >= 60 && time < 3600) {
        const s = time % 60;
        const m = parseInt((time - s) / 60);

        toReturn = `${m} min, ${s} s`;
    } else {
        const minSecs = time % 3600;
        const h = (time - minSecs) / 3600;
        const s = time % 60;
        const m = (minSecs - s) / 60;

        toReturn = `${h} h, ${m} min, ${s} s`;
    }

    return toReturn;
};

export const formatDuration = (time) => {
    return p(formatDurationWithNoStyling(time));
};

export const formatDateAndTime = (date) => {
    if (date) return p(moment(date).format('hh:mm, DD.MM.YYYY'));

    return p(errorMessage);
};

export const formatDate = (date, dateToCompare = false) => {
    if (date) {
        const formattedDate = moment(date).format('DD.MM.YYYY');

        return p(
            dateToCompare
                ? `${formattedDate} (${getTimeLeftToDate(date)})`
                : formattedDate
        );
    }

    return p(errorMessage);
};

export const formatDistance = (distance) => {
    if (distance) {
        if (distance < 1000) {
            return p(`${roundTo(0, distance)} m`);
        } else {
            return p(`${roundTo(1, distance / 1000)} km`);
        }
    }

    return p('0 km');
};

export const formatSpeed = (speed) => {
    const toReturn = speed != null ? `${roundTo(1, speed)} km/h` : errorMessage;

    return p(toReturn);
};

export const formatPrice = (price) => {
    return p(formatPriceWithNoStyling(price));
};

export const formatPriceWithNoStyling = (price) => {
    return price != null ? `${roundTo(2, price)} zł` : errorMessage;
};

export const formatMileage = (mileage) => {
    const toReturn =
        mileage != null ? `${mileage.toLocaleString()} km` : errorMessage;

    return p(toReturn);
};

export const formatWeight = (weight) => {
    const toReturn = weight != null ? `${weight} kg` : errorMessage;

    return p(toReturn);
};

export const formatEngineType = (engineType) => {
    switch (engineType) {
        case 'Petrol':
            return 'benzynowy';
        case 'Diesel':
            return 'diesel';
        case 'Hybrid':
            return 'hybryda';

        default:
            return errorMessage;
    }
};

export const formatEngineTypeBack = (engineType) => {
    switch (engineType) {
        case 'benzynowy':
            return 'Petrol';
        case 'diesel':
            return 'Diesel';
        case 'hybryda':
            return 'Hybrid';

        default:
            return errorMessage;
    }
};

export const formatDriveType = (driveType) => {
    switch (driveType) {
        case 'RWD':
            return 'tylno-napędowy';
        case 'FWD':
            return 'przednio-napędowy';
        case '4WD':
            return '4x4';

        default:
            return errorMessage;
    }
};

export const formatDriveTypeBack = (driveType) => {
    switch (driveType) {
        case 'tylno-napędowy':
            return 'RWD';
        case 'przednio-napędowy':
            return 'FWD';
        case '4x4':
            return '4WD';

        default:
            return errorMessage;
    }
};

const StyledCell = styled.p`
    margin: 0px auto;
`;

const p = (data) => {
    return <StyledCell>{data}</StyledCell>;
};
