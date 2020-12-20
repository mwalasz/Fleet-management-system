import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { DataGrid } from '@material-ui/data-grid';
import { VEHICLE_TRIPS_COLUMNS } from '../../utils/columns';
import { USER_ROLES } from '../../utils/constans';
import TripModal from '../../views/driver/content/trips/TripModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
`;

const VehicleTripsModal = ({ isVisible, handleClose, vehicle, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const filterVehicles = () => {
        if (user.role === USER_ROLES.driver) {
            return vehicle.trips.filter(
                (x) => x.driverAccount.account.email === user.email
            );
        } else {
            return vehicle.trips;
        }
    };

    const columnsButton = [
        {
            headerAlign: 'center',
            field: 'open',
            headerName: 'Mapa',
            width: 70,
            sortable: false,
            renderCell: (params) => {
                console.log('params', params.data);
                return (
                    params.data.locationHistory.length !== 0 && (
                        <StyledIcon
                            icon={faMapMarkedAlt}
                            onClick={() => {
                                setSelectedTrip(params.data);
                                setModalVisible(!modalVisible);
                            }}
                        />
                    )
                );
            },
        },
    ];

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
                        columns={[...VEHICLE_TRIPS_COLUMNS, ...columnsButton]}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
                <TripModal
                    ultraWide
                    trip={selectedTrip}
                    isVisible={modalVisible}
                    handleClose={() => setModalVisible(false)}
                />
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
