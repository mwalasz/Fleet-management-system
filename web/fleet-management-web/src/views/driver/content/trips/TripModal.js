import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Map from './maps/Map';

const TripModal = ({ isVisible, handleClose, children, wide, trip }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                title={
                    trip
                        ? `${trip.startPlace} - ${trip.destinationPlace}`
                        : 'Trasa'
                }
                wide
            >
                {/* <HeadingWrapper>
                    <Heading big>
                        {vehicle
                            ? `${vehicle.brand} ${vehicle.model}`
                            : 'Pojazd'}
                        {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                    </Heading>
                    {isError !== '' ? (
                        <NewItemErrorText>{isError}</NewItemErrorText>
                    ) : (
                        <span>&nbsp;&nbsp;</span>
                    )}
                </HeadingWrapper> */}
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
