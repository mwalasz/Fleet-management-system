import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authorization";

function Login(props) {
    const { classes, isLoggingIn, loginError, isAuthenticated, dispatch } = props;
    const [state, setState] = useState({
        mail: "ala@poczta.pl",
        password: "admin"
    })

    const handleSubmit = () => {
        const { mail, password } = state;
        console.log(state);
        // dispatch(loginUser(mail, password));
    };

    return (
        <div>
            <p>LoginPage</p>
            <button onClick={handleSubmit}>"send"</button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.isLoggingIn,
        loginError: state.loginError,
        isAuthenticated: state.isAuthenticated
    };
}
export default connect(mapStateToProps)(Login);