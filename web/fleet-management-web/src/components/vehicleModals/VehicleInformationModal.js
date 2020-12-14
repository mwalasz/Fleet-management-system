import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '../Modal';
import {
    faCalendarCheck,
    faTachometerAlt,
    faIdCardAlt,
} from '@fortawesome/free-solid-svg-icons';
import { StyledGrid, StyledGridRow } from '../Grid';
import {
    formatDate,
    formatMileage,
    formatWeight,
    formatEngineType,
    formatDriveType,
} from '../../utils/formating';

const VehicleInformationModal = ({ isVisible, handleClose, vehicle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {}, [refresh]);

    const renderRows = () => {
        if (isVisible) {
            const {
                curbWeight,
                insuranceExpirationDate,
                technicalInspectionDate,
                licensePlate,
                kmMileage,
                vin,
                yearOfProduction,
                powertrain,
            } = vehicle;
            const {
                engineCapacity,
                horsepower,
                torque,
                engineType,
                driveType,
            } = powertrain;

            return (
                <>
                    <StyledGridRow icon={faIdCardAlt} />
                    <StyledGridRow
                        heading={'Tablica rejestracyjna'}
                        text={licensePlate}
                    />
                    <StyledGridRow heading={'Numer VIN'} text={vin} />
                    <StyledGridRow
                        heading={'Rok produkcji'}
                        text={yearOfProduction}
                    />
                    <StyledGridRow
                        heading={'Przebieg'}
                        text={formatMileage(kmMileage)}
                    />
                    <StyledGridRow icon={faCalendarCheck} />
                    <StyledGridRow
                        heading={'ważność ubezpieczenia'}
                        text={formatDate(insuranceExpirationDate)}
                    />
                    <StyledGridRow
                        heading={'ważność badań technicznych'}
                        text={formatDate(technicalInspectionDate)}
                    />
                    <StyledGridRow icon={faTachometerAlt} />
                    <StyledGridRow
                        heading={'rodzaj silnika / typ napędu'}
                        text={`${formatEngineType(
                            engineType
                        )} / ${formatDriveType(driveType)}`}
                    />
                    <StyledGridRow
                        heading={'Moc / moment obrotowy'}
                        text={`${horsepower}km / ${torque}Nm`}
                    />
                    <StyledGridRow
                        heading={'pojemność silnika'}
                        text={`${engineCapacity}cc`}
                    />
                    <StyledGridRow
                        heading={'Waga'}
                        text={formatWeight(curbWeight)}
                    />
                </>
            );
        }

        return undefined;
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleClose}
                error={error}
                isLoading={isLoading}
                title={
                    vehicle
                        ? `Szczegółowe informacje dotyczące pojazdu ${vehicle.brand} ${vehicle.model}`
                        : 'Brak danych!'
                }
                centeredTitle
            >
                <StyledGridComponent>
                    <StyledGrid>{renderRows()}</StyledGrid>
                </StyledGridComponent>
            </Modal>
        </>
    );
};

const StyledGridComponent = styled.div`
    height: calc(100vh - 220px);
    margin: 0px auto;
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(VehicleInformationModal);
