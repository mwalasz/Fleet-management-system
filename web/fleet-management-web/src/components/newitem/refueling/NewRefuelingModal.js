import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Modal';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../../utils/constans';
import { NEW_REFUELING_VALIDATION_SCHEMA } from '../../../utils/validations';
import NewItemInput from '../NewItemInput';
import NewItemBottomButtons from '../NewItemBottomButtons';
import { StyledForm, TwoInputsInRowWrapper } from '../FormComponents';

const NewRefuelingModal = ({
    isVisible,
    handleCloseNew,
    vehicle,
    addedNew,
    user,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef(null);

    return (
        <>
            <Modal
                isVisible={isVisible}
                handleClose={handleCloseNew}
                error={error}
                isLoading={isLoading}
                title={'Dodaj nowe tankowanie'}
            >
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        cost: '',
                        liters: '',
                        odometerMileage: '',
                        placeDescription: '',
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
                        payload['liters'] = parseFloat(values.liters);
                        payload['costPerLiters'] = 0;
                        console.log('payload', payload);
                        await axios
                            .post(
                                `${API_URL}/vehicles/add_refueling`,
                                payload,
                                {
                                    withCredentials: true,
                                    headers: {
                                        Authorization: 'Bearer ' + user.token,
                                    },
                                }
                            )
                            .then((res) => {
                                const error = res.data;
                                console.log('error', error);
                                if (
                                    typeof error === 'string' &&
                                    error.includes('Błąd' || 'Error')
                                ) {
                                    console.log('error');
                                    setError(error);
                                } else {
                                    addedNew();
                                    formRef.current.resetForm();
                                    setError('');
                                    setTimeout(handleCloseNew, 1000);
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
                    validationSchema={NEW_REFUELING_VALIDATION_SCHEMA}
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
                                <Text>{'Data tankowania:'}</Text>
                                <NewItemInput
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors.time}
                                    touched={touched.time}
                                    value={values.time}
                                    maxToday
                                    type="datetime-local"
                                    name="time"
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
                                errors={errors.liters}
                                touched={touched.liters}
                                value={values.liters}
                                placeholder="litry [l]"
                                type="text"
                                name="liters"
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
                                errors={errors.placeDescription}
                                touched={touched.placeDescription}
                                value={values.placeDescription}
                                placeholder="miejsce tankowania"
                                type="text"
                                name="placeDescription"
                            />
                            <NewItemBottomButtons
                                onSubmit={onSubmit}
                                resetForm={() => {
                                    formRef.current.resetForm();
                                    setError('');
                                    handleCloseNew();
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

export default connect(mapStateToProps)(NewRefuelingModal);
