import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Heading from '../../Heading';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { API_URL, userRoles } from '../../../utils/constans';
import { NewCompanyValidationSchema } from '../../../utils/validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NewItemInput, { ErrorWrapper } from '../NewItemInput';
import NewItemErrorText from '../NewItemErrorText';
import NewItemBottomButtons from '../NewItemBottomButtons';
import Select from '../../Select';
import {
    StyledForm,
    TwoInputsInRowWrapper,
    HeadingWrapper,
    StyledWrapper,
} from '../FormComponents';
import SelectWrapper from '../SelectWrapper';

const NewCompanyBar = ({ isVisible, handleClose, setRefresh, user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const [managers, setManagers] = useState([]);
    const formRef = useRef(null);

    useEffect(async () => {
        setIsLoading(true);
        await axios
            .get(`${API_URL}/managers/get_all`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                const data = res.data.result;
                let tempManagers = [];
                data.forEach((el) => {
                    let manager = {
                        name: `${el.account.firstName} ${el.account.lastName}`,
                        mail: el.account.email,
                    };
                    tempManagers = [...tempManagers, manager];
                });

                if (tempManagers.length === 0) {
                    let manager = {
                        mail: 'Brak dostępnych kierowników',
                    };
                    tempManagers = [...tempManagers, manager];
                }

                setManagers(tempManagers);
                console.log(managers);
            })
            .catch((error) => {
                console.log(
                    `Błąd w trakcie pobierania dostępnych kont kierowników: ${error}`
                );
            });

        setIsLoading(false);
    }, []);

    return (
        <StyledWrapper isVisible={isVisible}>
            <HeadingWrapper>
                <Heading big>
                    {`Dodaj nowe przedsiębiorstwo:  `}
                    {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
                </Heading>
                {isError !== '' ? (
                    <NewItemErrorText>{isError}</NewItemErrorText>
                ) : (
                    <span>&nbsp;&nbsp;</span>
                )}
            </HeadingWrapper>
            <Formik
                innerRef={formRef}
                initialValues={{
                    name: '',
                    description: '',
                    addressCity: '',
                    addressStreet: '',
                    mail: '',
                    nip: '',
                    phoneNumber: '',
                    managerMail: '',
                }}
                onSubmit={async (values) => {
                    formRef.current
                        .validateForm()
                        .then(console.log('validation'));
                    setIsLoading(true);
                    setIsError('');

                    const payload = values;
                    payload.address = `${values.addressCity}, ${values.addressStreet}`;
                    delete payload.addressCity;
                    delete payload.addressStreet;

                    console.log('payload');
                    console.log(payload);

                    await axios
                        .post(`${API_URL}/companies/add`, payload, {
                            withCredentials: true,
                            headers: {
                                Authorization: 'Bearer ' + user.token,
                            },
                        })
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
                            const errorMessage =
                                error.response.data.responseException
                                    .exceptionMessage;
                            setIsError(`Błąd: ${errorMessage}`);
                            console.log(
                                `Błąd w trakcie próby dodania nowej firmy: ${errorMessage}`
                            );
                        });
                    setIsLoading(false);
                }}
                validationSchema={NewCompanyValidationSchema}
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
                        <SelectWrapper
                            title="Adres email managera:"
                            errors={errors.managerMail}
                            touched={touched.managerMail}
                        >
                            <Select
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                options={managers.map((x) => x.mail)}
                                value={values.managerMail}
                                onClick={(e) => {
                                    values.managerMail = e.target.value;
                                }}
                            />
                        </SelectWrapper>
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.name}
                            touched={touched.name}
                            value={values.name}
                            placeholder="nazwa"
                            type="text"
                            name="name"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.description}
                            touched={touched.description}
                            value={values.description}
                            placeholder="opis"
                            type="text"
                            name="description"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.nip}
                            touched={touched.nip}
                            value={values.nip}
                            placeholder="numer nip"
                            type="text"
                            name="nip"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.mail}
                            touched={touched.mail}
                            value={values.mail}
                            placeholder="adres email"
                            type="mail"
                            name="mail"
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
                        <TwoInputsInRowWrapper>
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.addressCity}
                                touched={touched.addressCity}
                                value={values.addressCity}
                                placeholder="miasto"
                                type="text"
                                name="addressCity"
                            />
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.addressStreet}
                                touched={touched.addressStreet}
                                value={values.addressStreet}
                                placeholder="ulica, numer lokalu"
                                type="text"
                                name="addressStreet"
                            />
                        </TwoInputsInRowWrapper>
                        <NewItemBottomButtons
                            onSubmit={onSubmit}
                            resetForm={() => {
                                formRef.current.resetForm();
                                setIsError('');
                                handleClose();
                            }}
                            low
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

export default connect(mapStateToProps)(NewCompanyBar);
