import { StyledGridRow } from '../Grid';
import { formatDurationWithNoStyling } from '../../utils/formating';

const RenderDrivingRows = ({ data }) => (
    <>
        <StyledGridRow heading={'Liczba tras'} text={data.numberOfTrips} />
        <StyledGridRow
            heading={'Dystans'}
            text={`${data.totalDistanceInKilometers.toFixed(2)} km`}
        />
        <StyledGridRow
            heading={'Czas'}
            text={formatDurationWithNoStyling(data.totalDurationInSeconds)}
        />
        <StyledGridRow
            heading={'Średnia prędkość'}
            text={`${data.averageSpeedInKilometersPerHour.toFixed(2)} km/h`}
        />
        <StyledGridRow
            heading={'Maks. prędkość'}
            text={`${data.maximumSpeedInKilometersPerHour.toFixed(2)} km/h`}
        />
    </>
);

export default RenderDrivingRows;
