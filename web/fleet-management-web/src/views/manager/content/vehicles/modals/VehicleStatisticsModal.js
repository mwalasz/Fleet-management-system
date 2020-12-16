import React, { useState } from 'react';
import VehicleStatisticsData from '../../../../charts/vehicleStatisticsDataWithCharts';
import Modal from '../../../../../components/Modal';
import Button from '../../../../../components/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const SelectCategoryButtons = ({ selected, select, deselect }) => (
    <div style={{ position: 'absolute', right: 0, top: 0, margin: '65px' }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button selected={selected} secondary onClick={select}>
                koszty
            </Button>
            <Button selected={!selected} secondary onClick={deselect}>
                eksploatacja
            </Button>
        </ButtonGroup>
    </div>
);

const VehicleStatisticsModal = ({
    isVisible,
    handleClose,
    vehicleStatistics,
    vehicleDescription,
}) => {
    const [costSelected, setCostSelected] = useState(false);
    const TITLE = 'Statystyki pojazdu';

    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={TITLE + `  ${vehicleDescription || ''}`}
            ultraWide
            button={
                <SelectCategoryButtons
                    selected={costSelected}
                    select={() => setCostSelected(true)}
                    deselect={() => setCostSelected(false)}
                />
            }
        >
            {vehicleStatistics && (
                <div style={{ marginTop: '70px' }}>
                    <VehicleStatisticsData
                        loadedStatisticsData={vehicleStatistics}
                        costSelected={costSelected}
                    />
                </div>
            )}
        </Modal>
    );
};

export default VehicleStatisticsModal;
