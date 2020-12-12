import React from 'react';
import Modal from '../../../../../components/Modal';
// import DataWithCharts from '../../../../driver/content/statistics/charts/DataWithCharts';

const VehicleStatisticsModal = ({ isVisible, handleClose }) => {
    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Statystyki pojazdu:`}
            // title={`Statystyki pojazdu:  ${driverDescription || ''}`}
            ultraWide
        >
            <p>statystyki pojazdu</p>
            {/* {driverStatistics && (
                <div style={{ marginTop: '70px' }}>
                    <DataWithCharts
                        loadedStatisticsData={driverStatistics}
                        reducedSize
                    />
                </div>
            )} */}
        </Modal>
    );
};

export default VehicleStatisticsModal;
