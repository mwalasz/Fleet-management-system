import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const VehicleRefuelingsModal = ({
    isVisible,
    handleClose,
    children,
    wide,
    vehicle,
}) => {
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
                    'Tankowania pojazdu' +
                    (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
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
            </Modal>
        </>
    );
};

export default VehicleRefuelingsModal;
