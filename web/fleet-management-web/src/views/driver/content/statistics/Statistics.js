import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../../utils/constans';
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
    Label,
    PolarAngleAxis,
    ResponsiveContainer,
} from 'recharts';
import { formatDurationWithNoStyling } from '../../../../utils/formating';
import FontAwesome from 'react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';

import PieCharts from './charts/PieCharts';

const Statistics = ({ user }) => {
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true);
        // axios
        //     .get(
        //         `${API_URL}/statistics/driver/get_data_per_vehicle_chart?mail=${user.email}`,
        //         {
        //             withCredentials: true,
        //             headers: {
        //                 Authorization: 'Bearer ' + user.token,
        //             },
        //         }
        //     )
        //     .then((res) => {
        //         setLoading(false);
        //         const data = res.data.result;
        //         if (data) {
        //             console.log('res.data.result');
        //             console.log(data);
        //             setColorPerVehicle(data);
        //             setDataPerVehicle(data);
        //         }
        //     })
        //     .catch((err) => {
        //         setLoading(false);
        //         console.log(
        //             `An error occurred while downloading user's vehicles: ${err}`
        //         );
        //     });
    }, []);

    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Twoje statystki'}</Title>
            </ContentHeader>
            <ContentBody>
                <PieCharts />
            </ContentBody>
        </ContentWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Statistics);
