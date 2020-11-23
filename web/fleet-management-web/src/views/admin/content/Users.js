import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewItemBar from '../../../components/NewItemBar';
import { DataGrid } from '@material-ui/data-grid';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { API_URL } from '../../../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Users = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log(user);
        setLoading(true);
        axios
            .get(`${API_URL}/users/get_all?onlyActiveUsers=true`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                    // 'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                setLoading(false);
                console.log(res.data.result);
                res.data.result.forEach((x) => {
                    x.id = x.email;
                });
                console.log(res.data.result);
                if (res.data.result) setUsers(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh]);

    const handleRemove = (mail) => {
        const arr = [mail];

        if (
            window.confirm(`Czy chcesz usunąć użytkownika o emailu: ${mail} ?`)
        ) {
            axios
                .put(
                    `${API_URL}/users/change_availability?isActive=false`,
                    arr,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: 'Bearer ' + user.token,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    setRefresh(!refresh);
                })
                .catch((err) => console.log(err));
        }
    };

    const columns = [
        { field: 'firstName', headerName: 'Imię', width: 130 },
        { field: 'lastName', headerName: 'Nazwisko', width: 130 },
        {
            field: 'phoneNumber',
            headerName: 'Numer telefonu',
            type: 'number',
            width: 200,
            sortable: false,
        },
        {
            field: 'email',
            headerName: 'Mail',
            width: 190,
        },
        {
            field: 'role',
            headerName: 'Rola',
            width: 90,
        },
        {
            field: 'remove',
            headerName: 'Usuń',
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemove(params.data.email)}
                    />
                );
            },
        },
    ];

    return (
        <div>
            <p>Users</p>
            <button onClick={() => setModalVisible(!modalVisible)}>
                dodaj
            </button>
            <DataGridWrapper>
                <DataGrid
                    loading={loading}
                    rows={users}
                    columns={columns}
                    pageSize={9}
                    disableSelectionOnClick
                    checkboxSelection
                />
            </DataGridWrapper>
            <NewItemBar isVisible={modalVisible} />
        </div>
    );
};

const DataGridWrapper = styled.div`
    margin-top: 10px;
    height: 800px;
    width: '100vw';
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Users);
