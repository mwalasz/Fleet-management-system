import React from 'react';
import VehicleStatisticsData from '../../../../../components/chartViews/VehicleStatisticsData';
import Modal from '../../../../../components/Modal';

const VehicleStatisticsModal = ({
    isVisible,
    handleClose,
    vehicleStatistics,
    vehicleDescription,
}) => {
    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Statystyki pojazdu:`}
            title={`Statystyki pojazdu:  ${vehicleDescription || ''}`}
            ultraWide
        >
            {vehicleStatistics && (
                <div style={{ marginTop: '70px' }}>
                    <VehicleStatisticsData
                        loadedStatisticsData={vehicleStatistics}
                    />
                </div>
            )}
        </Modal>
    );
};

export default VehicleStatisticsModal;
