import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../../../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@material-ui/data-grid';
import { formatDate, formatPrice } from '../../../../../utils/formating';

const VehicleRefuelingsModal = ({
    isVisible,
    handleClose,
    children,
    wide,
    vehicle,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const columns = [
        {
            field: 'placeDescription',
            headerName: 'Miejsce',
            width: 300,
            sortable: false,
        },
        {
            field: 'time',
            headerName: 'Czas',
            width: 150,
            sortable: false,
            renderCell: (params) => formatDate(params.data.time),
        },
        {
            field: 'cost',
            headerName: 'Koszt',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => formatPrice(params.data.cost),
        },
        {
            field: 'liters',
            headerName: 'Litry',
            width: 100,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'costPerLiter',
            headerName: 'l/zł',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => formatPrice(params.data.costPerLiter),
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
                    'Wszystkie tankowania pojazdu' +
                    (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
                }
                wide
            >
                <DataGridWrapper>
                    <DataGrid
                        loading={isLoading}
                        rows={isVisible ? vehicle.refuelings : []}
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

export default VehicleRefuelingsModal;
