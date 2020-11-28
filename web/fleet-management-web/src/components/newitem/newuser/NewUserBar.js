import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Heading from '../../Heading';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { API_URL, userRoles } from '../../../utils/constans';
import Select from '../../Select';
import { newUserValidationSchema } from '../../../utils/validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NewItemInput from '../NewItemInput';
import NewItemText from '../NewItemText';
import NewItemBottomButtons from '../NewItemBottomButtons';

const StyledWrapper = styled.div`
    border-left: 10px solid ${({ theme }) => theme.primaryColor};
    z-index: 999;
    position: fixed;
    display: flex;
    padding: 50px 90px;
    flex-direction: column;
    right: 0;
    top: 0;
    height: 100vh;
    width: 680px;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
    transition: transform 0.25s ease-in-out;
`;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const NameInputsWrapper = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    position: fixed;
    bottom: 200px;
    align-self: center;
`;

const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const NewUserBar = ({ isVisible, handleClose, setRefresh, user }) => {
    const [isDriver, setIsDriver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const formRef = useRef(null);

    return (
        <StyledWrapper isVisible={isVisible}>
            <HeadingWrapper>
                <Heading big>
                    {`Dodaj nowego ${isDriver ? 'kierowcę' : 'kierownika'}:  `}
                    {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                </Heading>
                {isError !== '' ? (
                    <NewItemText>{isError}</NewItemText>
                ) : (
                    <span>&nbsp;&nbsp;</span>
                )}
            </HeadingWrapper>
            <Formik
                innerRef={formRef}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    drivingLicenseNumber: '',
                }}
                onSubmit={async (values) => {
                    formRef.current
                        .validateForm()
                        .then(console.log('validation'));
                    setIsLoading(true);
                    setIsError('');

                    const payload = values;
                    if (!isDriver) delete payload.drivingLicenseNumber;

                    await axios
                        .post(
                            `${API_URL}/${
                                isDriver ? 'drivers' : 'managers'
                            }/add`,
                            payload,
                            {
                                withCredentials: true,
                                headers: {
                                    Authorization: 'Bearer ' + user.token,
                                },
                            }
                        )
                        .then((res) => {
                            const error = res.data.result;
                            if (
                                typeof error === 'string' &&
                                error.includes('Błąd' || 'Error')
                            ) {
                                console.log('error');
                                setIsError(error);
                            } else {
                                setRefresh();
                                formRef.current.resetForm();
                                setIsError('');
                                setTimeout(handleClose, 1000);
                            }
                        })
                        .catch((error) => {
                            setIsError(error.toString());
                            console.log(
                                `Error while user's attempt send data: ${error}`
                            );
                        });
                    setIsLoading(false);
                }}
                validationSchema={newUserValidationSchema(isDriver)}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    errors,
                    touched,
                    onSubmit,
                }) => (
                    <StyledForm>
                        <Select
                            options={[userRoles.driver, userRoles.manager]}
                            value={
                                isDriver ? userRoles.driver : userRoles.manager
                            }
                            onClick={(e) =>
                                setIsDriver(e.target.value === userRoles.driver)
                            }
                        />
                        <NameInputsWrapper>
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.firstName}
                                touched={touched.firstName}
                                value={values.firstName}
                                placeholder="imię"
                                type="text"
                                name="firstName"
                            />
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.lastName}
                                touched={touched.lastName}
                                value={values.lastName}
                                placeholder="nazwisko"
                                type="text"
                                name="lastName"
                            />
                        </NameInputsWrapper>
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                            value={values.email}
                            placeholder="adres email"
                            type="mail"
                            name="email"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.password}
                            touched={touched.password}
                            value={values.password}
                            placeholder="hasło"
                            type="password"
                            name="password"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.phoneNumber}
                            touched={touched.phoneNumber}
                            value={values.phoneNumber}
                            placeholder="numer telefonu"
                            type="text"
                            name="phoneNumber"
                        />
                        {isDriver && (
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.drivingLicenseNumber}
                                touched={touched.drivingLicenseNumber}
                                value={values.drivingLicenseNumber}
                                placeholder="numer prawa jazdy"
                                name="drivingLicenseNumber"
                                name="drivingLicenseNumber"
                            />
                        )}
                        <NewItemBottomButtons
                            onSubmit={onSubmit}
                            resetForm={() => {
                                formRef.current.resetForm();
                                setIsError('');
                                handleClose();
                            }}
                        />
                    </StyledForm>
                )}
            </Formik>
        </StyledWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(NewUserBar);
