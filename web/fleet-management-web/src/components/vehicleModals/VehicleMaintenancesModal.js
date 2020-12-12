import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { DataGrid } from '@material-ui/data-grid';
import { maintenancesColumns } from '../../utils/columns';

const VehicleMaintenancesModal = ({ isVisible, handleClose, vehicle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            error={error}
            isLoading={isLoading}
            title={
                'Wszystkie serwisy i naprawy pojazdu' +
                (vehicle && ` ${vehicle.brand} ${vehicle.model}`)
            }
            ultraWide
        >
            <DataGridWrapper>
                <DataGrid
                    loading={isLoading}
                    rows={isVisible ? vehicle.repairsAndServices : []}
                    columns={maintenancesColumns}
                    pageSize={parseInt(visualViewport.height / 80)}
                    disableSelectionOnClick
                    hideFooterRow
                />
            </DataGridWrapper>
        </Modal>
    );
};

const DataGridWrapper = styled.div`
    height: calc(100vh - 220px);
    margin: 0px auto;
`;

export default VehicleMaintenancesModal;
