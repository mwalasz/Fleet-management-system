import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/authorization";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import styled from "styled-components";

function Login(props) {
    const { isLoggingIn, loginError, isAuthenticated, dispatch } = props;
    const [state, setState] = useState({
        mail: "",
        password: ""
    })

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
                <FormWrapper>
                    {/* <LogoImage src={LOGO}/> */}
                    <Form>
                        <Title margin="0 0 20px">Logowanie</Title>
                        <Row>
                            <Input 
                                label="Mail" 
                                type="email" 
                                name="email" 
                                value={state.mail} 
                                onChange={(e) => setState({ ...state, mail :e.target.value })}/>
                        </Row>
                        <Row>
                            <Input 
                                label="Hasło" 
                                type="password" 
                                name="password" 
                                value={state.password} 
                                onChange={(e) => setState({...state, password: e.target.value })}/>
                        </Row>
                        {
                            loginError &&
                            <p>Error</p>
                        }
                        {
                            isLoggingIn &&
                            <p>Loading ...</p>
                        }
                        <Button big onClick={handleSubmit}>Zaloguj się</Button>
                    </Form>
                    <div/>
                </FormWrapper>
            </Wrapper>
        )
    }
};

Login.propTypes = {
};

function mapStateToProps(state) {
    return {
        isLoggingIn: state.isLoggingIn,
        loginError: state.loginError,
        isAuthenticated: state.isAuthenticated
    };
}
export default connect(mapStateToProps)(Login);

const LogoImage = styled.img`
  height: 80px;
  display: block;
  margin: 0 auto;
`;

const Row = styled.div`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 65%;
  height: 100%;
  
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
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
  height: 100%;
  background: white;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
`;
