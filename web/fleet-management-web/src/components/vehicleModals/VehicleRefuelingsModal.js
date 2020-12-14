import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { REFUELINGS_COLUMNS } from '../../utils/columns';
import NewRefuelingModal from '../newitem/refueling/NewRefuelingModal';
import { USER_ROLES } from '../../utils/constans';
import ModalAddButton from '../modal/ModalAddButton';

const VehicleRefuelingsModal = ({
    isVisible,
    handleClose,
    vehicle,
    setRefresh,
    user,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);

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
                button={
                    user.role === USER_ROLES.manager && (
                        <ModalAddButton
                            accept
                            onClick={() => setAddModalVisible(true)}
                        />
                    )
                }
                wide
            >
                <DataGridWrapper>
                    <DataGrid
                        loading={isLoading}
                        rows={isVisible ? vehicle.refuelings : []}
                        columns={REFUELINGS_COLUMNS}
                        pageSize={parseInt(visualViewport.height / 80)}
                        disableSelectionOnClick
                        hideFooterRow
                    />
                </DataGridWrapper>
                {user.role === USER_ROLES.manager && (
                    <NewRefuelingModal
                        vehicle={vehicle}
                        isVisible={addModalVisible}
                        handleCloseNew={(addedNew) => {
                            setAddModalVisible(false);
                            if (addedNew) {
                                handleClose();
                                setRefresh();
                            }
                        }}
                    />
                )}
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
export default connect(mapStateToProps)(VehicleRefuelingsModal);
