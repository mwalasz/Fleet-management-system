import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewCompanyModal from '../../../components/newitem/newcompany/NewCompanyModal';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { API_URL } from '../../../utils/constans';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../components/PageContents';
import { ADMIN_COMPANIES_COLUMNS } from '../../../utils/columns';
import CheckBox from './components/CheckBox';
import { DataGridWrapper, StyledIcon } from './components/Common';
import Alert from '../../../components/Alert';

const Companies = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCompanies, setActiveCompanies] = useState(true);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/companies/get_all?active=${activeCompanies}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                res.data.result.forEach((x) => {
                    x.id = x.nip;
                    const manager = x.managerAccount.account;
                    x.manager = `${manager.firstName} ${manager.lastName}`;
                });
                console.log(res.data.result);
                if (res.data.result) setCompanies(res.data.result);
            })
            .catch((err) => {
                console.log(
                    `An error occurred while downloading company data: ${err}`
                );
            });
    }, [refresh]);

    const handleUpdateCompanyAvailability = (mail) => {
        if (
            window.confirm(
                `Czy chcesz ${
                    activeCompanies ? 'usunąć' : 'aktywować'
                } przedsiębiorstwo o numerze nip ${mail} oraz wszystkich jego pracowników ?`
            )
        ) {
            axios
                .put(
                    `${API_URL}/companies/change_availability?isActive=${!activeCompanies}`,
                    [mail],
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
                    setSuccessAlert(true);
                })
                .catch((err) => {
                    console.log(err);
                    setErrorAlert(true);
                });
        }
    };

    const columnButtons = [
        {
            headerAlign: 'center',
            field: 'remove',
            headerName: activeCompanies ? 'Usuń' : 'Aktywuj',
            width: 90,
            sortable: false,
            renderCell: (params) => {
                return (
                    <StyledIcon
                        icon={activeCompanies ? faTrash : faRedo}
                        onClick={() =>
                            handleUpdateCompanyAvailability(params.data.nip)
                        }
                    />
                );
            },
        },
    ];

    return (
        <>
            <ContentWrapper>
                <Alert
                    success
                    title={
                        activeCompanies
                            ? 'Przedsiębiorstwo dezaktywowane.'
                            : 'Przedsiębiorstwo aktywowane.'
                    }
                    visible={successAlert}
                    makeInvisible={() => setSuccessAlert(false)}
                />
                <Alert
                    error
                    visible={errorAlert}
                    makeInvisible={() => setErrorAlert(false)}
                />
                <ContentHeader>
                    <Title>
                        {activeCompanies
                            ? 'Aktywne Przedsiębiorstwa'
                            : 'Nieaktywne Przedsiębiorstwa'}
                    </Title>
                    <Button
                        wide
                        secondary
                        onClick={() => setModalVisible(!modalVisible)}
                    >
                        DODAJ
                    </Button>
                </ContentHeader>
                <ContentBody>
                    <CheckBox
                        active={activeCompanies}
                        handleChangeActiveness={() => {
                            setActiveCompanies(!activeCompanies);
                            setRefresh(!refresh);
                        }}
                    />
                    <DataGridWrapper>
                        <DataGrid
                            loading={loading}
                            rows={companies}
                            columns={[
                                ...ADMIN_COMPANIES_COLUMNS,
                                ...columnButtons,
                            ]}
                            pageSize={parseInt(visualViewport.height / 80)}
                            disableSelectionOnClick
                            hideFooterRow
                        />
                    </DataGridWrapper>
                </ContentBody>
                <NewCompanyModal
                    isVisible={modalVisible}
                    handleClose={() => setModalVisible(false)}
                    setRefresh={() => setRefresh(!refresh)}
                />
            </ContentWrapper>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Companies);
