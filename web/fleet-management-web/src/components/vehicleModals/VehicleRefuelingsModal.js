import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DataGrid } from '@material-ui/data-grid';
import { formatDate, formatPrice } from '../../utils/formating';
import { refuelingsColumns } from '../../utils/columns';

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
                    'Wszystkie tankowania pojazdu' +
                    (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
                }
                wide
            >
                <DataGridWrapper>
                    <DataGrid
                        loading={isLoading}
                        rows={isVisible ? vehicle.refuelings : []}
                        columns={refuelingsColumns}
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
