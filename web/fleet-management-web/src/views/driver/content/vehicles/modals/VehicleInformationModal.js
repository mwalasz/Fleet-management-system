import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../../../../../utils/constans';

const VehicleInformationModal = ({
    isVisible,
    handleClose,
    children,
    wide,
    vehicle,
    user,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);
    // const [vehicleData, setVehicleData] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        // axios
        //     .get(`${API_URL}/vehicles/get_info?vin=${vehicle.vin}`, {
        //         withCredentials: true,
        //         headers: {
        //             Authorization: 'Bearer ' + user.token,
        //         },
        //     })
        //     .then((res) => {
        //         setIsLoading(false);
        //         const data = res.data.result;
        //         console.log(data);

        //         // if (data) {
        //         //     console.log('res.data.result');
        //         //     console.log(data);
        //         //     setVehicleData(data);
        //         // }
        //     })
        //     .catch((err) => {
        //         setIsLoading(false);
        //         console.log(
        //             `An error occurred while downloading user's vehicles: ${err}`
        //         );
        //     });
    }, [refresh]);

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                title={
                    vehicle
                        ? `Szczegółowe informacje dotyczące ${vehicle.brand} ${vehicle.model}`
                        : 'Brak danych!'
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(VehicleInformationModal);
