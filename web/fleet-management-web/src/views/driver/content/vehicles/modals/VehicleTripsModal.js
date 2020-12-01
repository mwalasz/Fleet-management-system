import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@material-ui/data-grid';
import {
    formatTimeData,
    formatDate,
    formatDistance,
    formatSpeed,
} from '../../../../../utils/formating';

const StyledIcon = styled(FontAwesomeIcon)`
    margin: 0px auto;
    cursor: pointer;
`;

const StyledCell = styled.p`
    margin: 0px auto;
`;

const p = (data) => {
    return <StyledCell>{data}</StyledCell>;
};

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

    const columns = [
        {
            field: 'startPlace',
            headerName: 'Miejsce rozpoczęcia',
            width: 180,
        },
        {
            field: 'startTime',
            headerName: 'Czas rozpoczęcia',
            width: 150,
            sortable: false,
            renderCell: (params) => p(formatDate(params.data.startTime)),
        },
        {
            field: 'destinationPlace',
            headerName: 'Cel',
            width: 180,
        },
        {
            field: 'destinationArrivalTime',
            headerName: 'Czas zakończenia',
            width: 165,
            align: 'center',
            headerAlign: 'center',
            sortable: false,
            renderCell: (params) =>
                p(formatDate(params.data.destinationArrivalTime)),
        },
        {
            field: 'distance',
            headerName: 'Dystans',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => p(formatDistance(params.data.distance)),
        },
        {
            field: 'travelTime',
            headerName: 'Czas jazdy',
            width: 150,
            sortable: false,
            headerAlign: 'center',
            renderCell: (params) => p(formatTimeData(params.data.travelTime)),
        },
        {
            field: 'averageSpeed',
            headerName: 'Śr. prędkość',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => p(formatSpeed(params.data.averageSpeed)),
        },
        {
            field: 'maximumSpeed',
            headerName: 'Maks. prędkość',
            width: 140,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => p(formatSpeed(params.data.maximumSpeed)),
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
                        columns={columns}
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
