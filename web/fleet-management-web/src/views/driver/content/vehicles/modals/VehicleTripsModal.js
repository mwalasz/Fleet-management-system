import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@material-ui/data-grid';
import { tripsColumns } from '../../../../../utils/columns';

const VehicleTripsModal = ({
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
    const [trips, setTrips] = useState([]);

    useEffect(() => {}, [refresh]);

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                title={
                    'Twoje trasy pojazdem' +
                    (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
                }
                ultraWide
            >
                {/* <button onClick={() => console.log('user: ', user)}>
                    Pokaz wycieczki
                </button> */}
                <DataGridWrapper>
                    <DataGrid
                        loading={isLoading}
                        rows={
                            isVisible
                                ? vehicle.trips.filter(
                                      (x) =>
                                          x.driverAccount.account.email ===
                                          user.email
                                  )
                                : []
                        }
                        columns={tripsColumns}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
            </Modal>
        </>
    );
};

const DataGridWrapper = styled.div`
    height: calc(100vh - 220px);
    margin: 0px auto;
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(VehicleTripsModal);
