import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { API_URL, userRoles } from '../../../utils/constans';
import Select from '../../Select';
import { newUserValidationSchema } from '../../../utils/validations';
import NewItemInput from '../NewItemInput';
import NewItemBottomButtons from '../NewItemBottomButtons';
import { StyledForm, TwoInputsInRowWrapper } from '../FormComponents';
import SelectWrapper from '../SelectWrapper';
import Modal from './../../Modal';

const NewUserBar = ({ isVisible, handleClose, setRefresh, user }) => {
    const [isDriver, setIsDriver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={`Dodaj nowego ${isDriver ? 'kierowcę' : 'kierownika'}:  `}
            error={error}
            isLoading={isLoading}
        >
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
                    setError('');

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
                                setError(error);
                            } else {
                                setRefresh();
                                formRef.current.resetForm();
                                setError('');
                                setTimeout(handleClose, 1000);
                            }
                        })
                        .catch((error) => {
                            setError(error.toString());
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
                        <SelectWrapper title={'Rola użytkownika:'}>
                            <Select
                                options={[userRoles.driver, userRoles.manager]}
                                value={
                                    isDriver
                                        ? userRoles.driver
                                        : userRoles.manager
                                }
                                onClick={(e) =>
                                    setIsDriver(
                                        e.target.value === userRoles.driver
                                    )
                                }
                            />
                        </SelectWrapper>
                        <TwoInputsInRowWrapper>
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
                        </TwoInputsInRowWrapper>
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
                                setError('');
                                handleClose();
                            }}
                        />
                    </StyledForm>
                )}
            </Formik>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(NewUserBar);
