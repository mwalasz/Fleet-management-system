import React from 'react';
import { connect } from 'react-redux';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';
import DriverStatisticsData from '../../../../components/charts/DriverStatisticsData';

const Statistics = ({ user }) => {
    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Twoje statystki'}</Title>
            </ContentHeader>
            <ContentBody>
                <DriverStatisticsData />
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
