import React from 'react';
import Modal from '../../../../../components/Modal';
import DataWithCharts from '../../../../driver/content/statistics/charts/DataWithCharts';

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
                    <DataWithCharts
                        loadedStatisticsData={driverStatistics}
                        reducedSize
                    />
                </div>
            )}
        </Modal>
    );
};

export default DriverStatisticsModal;
