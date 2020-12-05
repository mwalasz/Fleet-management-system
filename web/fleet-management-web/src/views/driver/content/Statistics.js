import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../../utils/constans';

const Statistics = ({ user }) => {
    return (
        <>
            <p>Statistics</p>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Statistics);
