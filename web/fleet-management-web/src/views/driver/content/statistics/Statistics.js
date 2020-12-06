import React from 'react';
import { connect } from 'react-redux';
import Title from '../../../../components/Title';
import {
    ContentWrapper,
    ContentBody,
    ContentHeader,
} from '../../../../components/PageContents';
import DataWithCharts from './charts/DataWithCharts';

const Statistics = ({ user }) => {
    return (
        <ContentWrapper>
            <ContentHeader>
                <Title>{'Twoje statystki'}</Title>
            </ContentHeader>
            <ContentBody>
                <DataWithCharts />
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
