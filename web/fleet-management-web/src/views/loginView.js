import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/authorization_actions';
import Input from '../components/Input';
import Title from '../components/Title';
// import Button from '@material-ui/core/Button';
import Button from '../components/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';
import logo from '../images/logo.png';

const LoginView = (props) => {
    const { isLoggingIn, loginError, isAuthenticated, dispatch } = props;
    const [state, setState] = useState({
        mail: '',
        password: '',
    });

    const handleSubmit = () => {
        const { mail, password } = state;
        console.log(state);
        dispatch(loginUser(mail, password));
    };

    const checkIfCorrectMail = () => {
        return state.mail.length !== 0 && isMailWrong(state.mail);
    };

    if (isAuthenticated) {
        return <Redirect to="/panel" />;
    } else {
        const isMailCorrect = checkIfCorrectMail();

        return (
            <Wrapper>
                <LoadingBar>
                    {isLoggingIn && <LinearProgress color="primary" />}
                </LoadingBar>
                <FormWrapper>
                    <Title big margin="0 0 20px">
                        SYSTEM ZARZĄDZANIA POJAZDAMI
                    </Title>
                    <LogoImage src={logo} />
                    <Form>
                        <Row>
                            <Input
                                error={isMailCorrect}
                                errorText="Podaj prawidłowy adres mailowy!"
                                label="Mail"
                                type="email"
                                name="email"
                                value={state.mail}
                                onChange={(e) =>
                                    setState({ ...state, mail: e.target.value })
                                }
                            />
                            {isMailCorrect ? undefined : SPACER}
                        </Row>
                        <Row>
                            <Input
                                label="Hasło"
                                type="password"
                                name="password"
                                value={state.password}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        password: e.target.value,
                                    })
                                }
                            />
                            {SPACER}
                        </Row>
                        <Row>
                            <Button
                                ultraWide
                                secondary
                                onClick={handleSubmit}
                                disabled={
                                    checkIfCorrectMail() &&
                                    state.password.length === 0
                                }
                            >
                                Zaloguj się
                            </Button>
                        </Row>
                        <Row>
                            <ErrorText>
                                {loginError
                                    ? 'Wystąpił błąd, proszę spróbować ponownie.'
                                    : SPACER}
                            </ErrorText>
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

const ErrorText = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.red};
    font-weight: ${({ theme }) => theme.font.Bold};
`;

const SPACER = <span>&nbsp;&nbsp;</span>;

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
