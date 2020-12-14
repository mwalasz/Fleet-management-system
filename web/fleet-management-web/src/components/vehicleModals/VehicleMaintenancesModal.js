import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../utils/constans';
import NewMaintenanceModal from '../newitem/maintenance/NewMaintenanceModal';
import { maintenancesColumns } from '../../utils/columns';

const VehicleMaintenancesModal = ({
    isVisible,
    handleClose,
    vehicle,
    setRefresh,
    user,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [addedNewItem, setAddedNewItem] = useState(false);

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
                {user.role === USER_ROLES.manager && (
                    <button onClick={() => setAddModalVisible(true)}>
                        dodaj
                    </button>
                )}
                <DataGrid
                    loading={isLoading}
                    rows={isVisible ? vehicle.repairsAndServices : []}
                    columns={maintenancesColumns}
                    pageSize={parseInt(visualViewport.height / 80)}
                    disableSelectionOnClick
                    hideFooterRow
                />
            </DataGridWrapper>
            {user.role === USER_ROLES.manager && (
                <NewMaintenanceModal
                    vehicle={vehicle}
                    isVisible={addModalVisible}
                    addedNew={() => setAddedNewItem(true)}
                    handleCloseNew={() => {
                        setAddModalVisible(false);
                        if (addedNewItem) {
                            handleClose();
                            setRefresh();
                        }
                    }}
                />
            )}
        </Modal>
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
export default connect(mapStateToProps)(VehicleMaintenancesModal);
