import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlayCircle,
    faSpinner,
    faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import Map from './maps/Map';
import Heading from '../../../../components/Heading';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px 10px;
    color: ${({ theme, stop }) => stop && theme.red};
    color: ${({ theme, start }) => start && theme.green};
`;

const TripModal = ({ isVisible, handleClose, children, wide, trip }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const createTitle = () => {
        if (isVisible) {
            const startData = trip.startPlace.split(', ');
            const destinationData = trip.destinationPlace.split(', ');
            const arePlacesFromSameCountry =
                startData[1] === destinationData[1];
            const countryName = startData[1];
            const startPlaceName = startData[0];
            const destinationPlaceName = destinationData[0];

            return (
                <div style={{ margin: '0px 0px 30px 0px' }}>
                    <div>
                        <StyledIcon icon={faPlayCircle} start />
                        {`Start: ${
                            arePlacesFromSameCountry
                                ? startPlaceName
                                : trip.startPlace
                        }`}
                    </div>
                    <div>
                        <StyledIcon icon={faStopCircle} stop />
                        {`Cel: ${
                            arePlacesFromSameCountry
                                ? destinationPlaceName
                                : trip.destinationPlace
                        }`}
                    </div>
                    {/* <div>
                        <StyledIcon icon={faStopCircle} stop />
                        {`Cel: ${
                            sameCountry
                                ? destinationPlace
                                : trip.destinationPlace
                        }`}
                    </div> */}
                </div>
            );
        }

        return undefined;
    };

    const CountryIcon = styled.img`
        height: 10px;
        width: 30px;
    `;

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                // title={
                //     trip
                //         ? `${trip.startPlace} - ${trip.destinationPlace}`
                //         : 'Trasa'
                // }
                // title={createTitle()}
                wide
            >
                <Heading doubleLine>{createTitle()}</Heading>
                {isVisible && (
                    <Map
                        coords={isVisible ? trip.locationHistory : []}
                        isMarkerShown
                        isRouteShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
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
