import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { DataGrid } from '@material-ui/data-grid';
import { VEHICLE_TRIPS_COLUMNS } from '../../utils/columns';
import { USER_ROLES } from '../../utils/constans';

const VehicleTripsModal = ({ isVisible, handleClose, vehicle, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const filterVehicles = () => {
        if (user.role === USER_ROLES.driver) {
            return vehicle.trips.filter(
                (x) => x.driverAccount.account.email === user.email
            );
        } else {
            return vehicle.trips;
        }
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                title={
                    user.role !== USER_ROLES.driver
                        ? 'Trasy pojazdu'
                        : 'Twoje trasy pojazdem ' +
                          (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
                }
                ultraWide
            >
                <DataGridWrapper>
                    <DataGrid
                        loading={isLoading}
                        rows={isVisible ? filterVehicles() : []}
                        columns={VEHICLE_TRIPS_COLUMNS}
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
