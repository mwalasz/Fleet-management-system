import React, { useState } from 'react';
import NewItemBar from '../../../components/NewItemBar';

const Users = ({}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div>
            <p>Users</p>
            <button onClick={() => setModalVisible(!modalVisible)}>
                dodaj
            </button>
            <NewItemBar isVisible={modalVisible} />
        </div>
    );
};

export default Users;
