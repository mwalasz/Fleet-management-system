import moment from 'moment';
import styled from 'styled-components';

const errorMessage = 'Błąd!';

export const roundTo = (numOfPlaces, numberToRound) => {
    return numOfPlaces !== 0
        ? parseFloat(numberToRound).toFixed(numOfPlaces)
        : parseFloat(numberToRound);
};

export const formatTimeData = (time) => {
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

    return p(toReturn);
};

export const formatDate = (date) => {
    if (date) {
        return p(moment(date).format('hh:mm, MM.DD.YYYY'));
    }

    return p(errorMessage);
};

export const formatDistance = (distance) => {
    let toReturn;

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
    const toReturn = price != null ? `${roundTo(2, price)} zł` : errorMessage;

    return p(toReturn);
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
        case '4x4':
            return '4x4';

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
