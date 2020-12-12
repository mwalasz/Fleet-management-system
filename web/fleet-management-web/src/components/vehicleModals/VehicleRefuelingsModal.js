import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { DataGrid } from '@material-ui/data-grid';
import { refuelingsColumns } from '../../utils/columns';

const VehicleRefuelingsModal = ({ isVisible, handleClose, vehicle }) => {
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
