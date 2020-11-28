import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Heading from '../../Heading';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { API_URL, userRoles } from '../../../utils/constans';
import Button from '../../Button';
import Select from '../../Select';
import { NewCompanyValidationSchema } from '../../../utils/validations';
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

const NewCompanyBar = ({ isVisible, handleClose, setRefresh, token }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const formRef = useRef(null);

    return (
        <StyledWrapper isVisible={isVisible}>
            <HeadingWrapper>
                <Heading big>
                    {`Dodaj nowe przedsiębiorstwo:  `}
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

                    console.log('payload');
                    console.log(payload);

                    await axios
                        .post(`${API_URL}/companies/add`, payload, {
                            withCredentials: true,
                            headers: {
                                Authorization: 'Bearer ' + token,
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
                            setIsError(error.toString());
                            console.log(
                                `Error while user's attempt send data: ${error}`
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
                        <NameInputsWrapper>
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
                        </NameInputsWrapper>
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
        token: state.user,
    };
};

export default connect(mapStateToProps)(NewCompanyBar);
