import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authorization_actions";
import Input from "../components/Input";
import Title from "../components/title";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";
import logo from "../images/logo.png";

const LoginView = (props) => {
  const { isLoggingIn, loginError, isAuthenticated, dispatch } = props;
  const [state, setState] = useState({
    mail: "",
    password: "",
  });

  const handleSubmit = () => {
    const { mail, password } = state;
    console.log(state);
    dispatch(loginUser(mail, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/panel" />;
  } else {
    return (
      <Wrapper>
        <LoadingBar>
          {isLoggingIn && <LinearProgress color="primary" />}
        </LoadingBar>
        <FormWrapper>
          <Title margin="0 0 20px">SYSTEM ZARZĄDZANIA POJAZDAMI</Title>
          <LogoImage src={logo} />
          <Form>
            <Row>
              <Input
                error={state.mail.length != 0 && isMailWrong(state.mail)}
                errorText="Podaj prawidłowy adres mailowy!"
                label="Mail"
                type="email"
                name="email"
                value={state.mail}
                onChange={(e) => setState({ ...state, mail: e.target.value })}
              />
            </Row>
            <Row>
              <Input
                label="Hasło"
                type="password"
                name="password"
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </Row>
            <Row>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                fullWidth="350px"
                disabled={state.mail.length == 0 || state.password.length == 0}
              >
                Zaloguj się
              </Button>
            </Row>
            <Row>
              {loginError ? "Wystąpił błąd, proszę spróbować ponownie." : "  "}
            </Row>
          </Form>
        </FormWrapper>
      </Wrapper>
    );
  }
};

const isMailWrong = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
};

const mapStateToProps = (state) => {
  return {
    isLoggingIn: state.isLoggingIn,
    loginError: state.loginError,
    isAuthenticated: state.isAuthenticated,
  };
};
export default connect(mapStateToProps)(LoginView);

const LoadingBar = styled.div`
  width: 100vw;
  position: absolute;
`;

const LogoImage = styled.img`
  height: 300px;
  width: 300px;
  display: block;
  margin: 0 auto;
`;

const Row = styled.div`
  margin-bottom: 20px;
  justify-content: center;
`;

const Form = styled.div`
  width: 350px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
  background: white;
`;

const Wrapper = styled.div`
  margin-top: 10;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
`;
