import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../utils/constans';
import { connect } from 'react-redux';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { StyledGrid, StyledGridRow } from '../../../../components/Grid';
import {
    faSpinner,
    faChartBar,
    faCarSide,
} from '@fortawesome/free-solid-svg-icons';
import { Spinner, TitleWrapper } from '../components/common';

const Company = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/managers/get_company?mail=${user.email}`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('company info', data);
                    data.driversNumber = data.drivers.length;
                    data.vehiclesNumber = data.vehicles.length;
                    delete data.vehicles;
                    delete data.drivers;
                    setData(data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            }, []);
        setLoading(false);
    });

    return (
        <ContentWrapper>
            <ContentHeader>
                <TitleWrapper>
                    <Title margin>{'Informacje o przedsiębiorstwie'}</Title>
                    {!data && <Spinner icon={faSpinner} spin size={'lg'} />}
                </TitleWrapper>
            </ContentHeader>
            <ContentBody>
                {data && (
                    <div style={{ marginTop: '10px' }}>
                        <StyledGridRow heading={'Nazwa'} text={data.name} />
                        <StyledGridRow heading={'Nip'} text={data.nip} />
                        <StyledGridRow
                            heading={'Opis'}
                            text={data.description}
                        />
                        <StyledGridRow
                            heading={'Adres'}
                            text={data.address}
                            style={{ marginTop: '100px' }}
                        />
                        <StyledGridRow heading={'Mail'} text={data.mail} />
                        <StyledGridRow
                            heading={'Numer telefonu'}
                            text={data.phoneNumber}
                        />
                        <StyledGridRow
                            heading={'Ilość kierowców'}
                            text={data.vehiclesNumber}
                        />
                        <StyledGridRow
                            heading={'Ilość pojazdów'}
                            text={data.driversNumber}
                        />
                    </div>
                )}
            </ContentBody>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Company);
