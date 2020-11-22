import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

function Dashboard({ dispatch, user, children }) {
    return <Wrapper>{children}</Wrapper>;
}

const mapStateToProps = (state) => {
    return {
        isLoggingOut: state.isLoggingOut,
        logoutError: state.logoutError,
        user: state.user,
    };
};
export default connect(mapStateToProps)(Dashboard);

const Wrapper = styled.div`
    width: 90vw;
    height: 100vh;
    display: flex;
`;
