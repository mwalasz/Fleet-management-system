import React from 'react';
import Modal from '../../../../../components/Modal';
import DriverStatisticsData from '../../../../../components/chartViews/DriverStatisticsData';

const DriverStatisticsModal = ({
    isVisible,
    handleClose,
    driverStatistics,
    driverDescription,
}) => {
    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Statystyki kierowcy:  ${driverDescription || ''}`}
            ultraWide
        >
            {driverStatistics && (
                <div style={{ marginTop: '70px' }}>
                    <DriverStatisticsData
                        loadedStatisticsData={driverStatistics}
                        reducedSize
                    />
                </div>
            )}
        </Modal>
    );
};

export default DriverStatisticsModal;
