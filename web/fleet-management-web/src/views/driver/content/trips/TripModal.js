import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faSpinner,
    faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import Map from './maps/Map';
import Heading from '../../../../components/Heading';
import { GOOGLE_MAPS_URL } from '../../../../utils/constans';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px 10px;
    color: ${({ theme, stop }) => stop && theme.red};
    color: ${({ theme, start }) => start && theme.green};
`;

const CountryIcon = styled.img`
    height: 30px;
    width: 45px;
    border: 1px solid black;
`;

const TripModal = ({ isVisible, handleClose, trip, ultraWide }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const createTitle = () => {
        if (isVisible) {
            let start = trip.startPlace;
            let destination = trip.destinationPlace;

            const startData = start.split(', ');
            const destinationData = destination.split(', ');

            if (startData.length === 2 && destinationData.length === 2) {
                const arePlacesFromSameCountry =
                    startData[1] === destinationData[1];
                // const countryName = startData[1];
                const startPlaceName = startData[0];
                const destinationPlaceName = destinationData[0];

                start = `Start: ${
                    arePlacesFromSameCountry ? startPlaceName : start
                }`;

                destination = `Cel: ${
                    arePlacesFromSameCountry
                        ? destinationPlaceName
                        : destination
                }`;
            }

            return (
                <div style={{ margin: '0px 0px 30px 0px' }}>
                    <div>
                        <StyledIcon icon={faPlayCircle} start />
                        {start}
                    </div>
                    <div>
                        <StyledIcon icon={faStopCircle} stop />
                        {destination}
                    </div>
                </div>
            );
        }

        return undefined;
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                wide={!ultraWide}
                ultraWide={ultraWide}
            >
                <Heading doubleLine>{createTitle()}</Heading>
                {isVisible && (
                    <Map
                        coords={isVisible ? trip.locationHistory : []}
                        isMarkerShown
                        isRouteShown
                        googleMapURL={GOOGLE_MAPS_URL}
                        loadingElement={
                            <FontAwesomeIcon icon={faSpinner} spin />
                        }
                        containerElement={<MapWrapper />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                )}
            </Modal>
        </>
    );
};

const MapWrapper = styled.div`
    height: calc(100vh - 220px);
    margin: 0px auto;
    border: 4px solid ${({ theme }) => theme.primaryColor};
    box-shadow: 0 0 15px gray;
`;

export default TripModal;
