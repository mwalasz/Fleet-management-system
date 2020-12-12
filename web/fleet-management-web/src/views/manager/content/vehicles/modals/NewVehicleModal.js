import React from 'react';
import Modal from '../../../../../components/Modal';

const NewVehicleModal = ({ isVisible, handleClose }) => {
    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Dodaj nowy pojazd:`}
        >
            <p>nowy pojazd</p>
        </Modal>
    );
};

export default NewVehicleModal;
