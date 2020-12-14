import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Modal';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../../utils/constans';
import { NEW_MAINTENANCE_VALIDATION_SCHEMA } from '../../../utils/validations';
import NewItemInput from '../NewItemInput';
import NewItemBottomButtons from '../NewItemBottomButtons';
import { StyledForm } from '../FormComponents';

const NewMaintenanceModal = ({ isVisible, handleCloseNew, vehicle, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={() => handleCloseNew(false)}
                error={error}
                isLoading={isLoading}
                title={'Dodaj nowy serwis lub naprawę'}
            >
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        cost: '',
                        providerDescription: '',
                        date: '',
                        odometerMileage: '',
                        usedParts: '',
                    }}
                    onSubmit={async (values) => {
                        formRef.current
                            .validateForm()
                            .then(console.log('validation'));
                        setIsLoading(true);
                        setError('');

                        const payload = values;
                        payload['vin'] = vehicle.vin;
                        payload['odometerMileage'] = parseFloat(
                            values.odometerMileage
                        );
                        payload['cost'] = parseFloat(values.cost);
                        console.log('payload', payload);

                        await axios
                            .post(
                                `${API_URL}/vehicles/add_maintenance`,
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
                                    formRef.current.resetForm();
                                    setError('');
                                    setTimeout(() => handleCloseNew(true), 500);
                                }
                            })
                            .catch((error) => {
                                const message = error.response.data.responseException.exceptionMessage.toString();
                                setError('Błąd: ' + message);
                                console.log(
                                    `Error while user's attempt send data: ${message}`
                                );
                            });
                        setIsLoading(false);
                    }}
                    validationSchema={NEW_MAINTENANCE_VALIDATION_SCHEMA}
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifycontent: 'space-around',
                                }}
                            >
                                <Text>{'Data wydarzenia:'}</Text>
                                <NewItemInput
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.date}
                                    touched={touched.date}
                                    value={values.date}
                                    maxToday
                                    type="datetime-local"
                                    name="date"
                                />
                            </div>
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.cost}
                                touched={touched.cost}
                                value={values.cost}
                                placeholder="koszt [zł]"
                                type="text"
                                name="cost"
                            />
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.usedParts}
                                touched={touched.usedParts}
                                value={values.usedParts}
                                placeholder="użyte części, np: część, część ..."
                                type="text"
                                name="usedParts"
                            />
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.odometerMileage}
                                touched={touched.odometerMileage}
                                value={values.odometerMileage}
                                placeholder="przebieg pojazdu [km]"
                                type="text"
                                name="odometerMileage"
                            />
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.providerDescription}
                                touched={touched.providerDescription}
                                value={values.providerDescription}
                                placeholder="wykonawca"
                                type="text"
                                name="providerDescription"
                            />
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.description}
                                touched={touched.description}
                                value={values.description}
                                placeholder="opis prac"
                                type="text"
                                name="description"
                            />
                            <NewItemBottomButtons
                                onSubmit={onSubmit}
                                resetForm={() => {
                                    formRef.current.resetForm();
                                    setError('');
                                    handleCloseNew(false);
                                }}
                            />
                        </StyledForm>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

const Text = styled.h3`
    align-self: flex-start;
    margin: auto 100px;
    line-height: 0px;
    color: ${({ theme }) => theme.primaryColor};
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(NewMaintenanceModal);
