import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Heading from '../components/Heading';
import { connect } from 'react-redux';
import { theme } from '../utils/theme';
import { Formik, Form } from 'formik';
import FormInput from './FormInput';
import Button from './Button';
import Select from './Select';
import * as Yup from 'yup';

const StyledWrapper = styled.div`
    border-left: 10px solid ${({ theme }) => theme.primaryColor};
    z-index: 999;
    position: fixed;
    display: flex;
    padding: 100px 90px;
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

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const onlyLettersRegex = /^[^\W\d]+$/;

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const StyledInput = styled(FormInput)`
    margin-top: 30px;
`;

const Text = styled.text`
    align-self: center;
    margin-left: '10px';
    font-size: '10px';
    color: ${({ theme }) => theme.red};
    font-weight: ${({ theme }) => theme.font.Bold};
`;

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Zbyt krótkie imię!')
        .max(20, 'Zbyt długie imię!')
        .matches(onlyLettersRegex, 'Dozwolone są tylko litery!')
        .required('Imię jest wymagane!'),
    lastName: Yup.string()
        .min(2, 'Zbyt krótkie nazwisko!')
        .max(20, 'Zbyt długie nazwisko!')
        .matches(onlyLettersRegex, 'Dozwolone są tylko litery!')
        .required('Nazwisko jest wymagane!'),
    email: Yup.string()
        .email('Niepoprawny adres. Spróbuj ponownie.')
        .required('Mail jest wymagany!'),
    phoneNumber: Yup.string()
        .required('Numer telefonu jest wymagany!')
        .matches(phoneRegex, 'Numer telefonu jest nieprawidłowy!')
        .min(9, 'Numer telefonu jest zbyt krótki!')
        .max(9, 'Numer telefonu jest zbyt długi!'),
    drivingLicenseNumber: Yup.string()
        .length(9, 'Numer musi zawierać 9 cyfr!')
        .required('Numer prawa jazdy jest wymagany!'),
});

const NewItemBar = ({ isVisible, addItem, handleClose }) => {
    const [isDriver, setIsDriver] = useState(false);
    const formRef = useRef(null);

    return (
        <StyledWrapper isVisible={isVisible}>
            <Heading big>{`Dodaj nowego ${
                isDriver ? 'kierowcę' : 'menedżera'
            }:`}</Heading>
            <Formik
                innerRef={formRef}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    drivingLicenseNumber: '',
                }}
                onSubmit={(values) => {
                    console.log('submit');
                    console.log(values);
                    handleClose();
                }}
                validationSchema={ValidationSchema}
                onReset={(values) => {
                    console.log('reset');
                    console.log('values');
                    console.log(values);
                    handleClose();
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <StyledForm>
                        <Select
                            options={['kierowca', 'menedżer']}
                            value={isDriver ? 'kierowca' : 'menedżer'}
                            onClick={(e) =>
                                setIsDriver(e.target.value === 'kierowca')
                            }
                        />
                        <NameInputsWrapper>
                            <InputWithError>
                                <StyledInput
                                    autoComplete="nope"
                                    wide
                                    error={
                                        errors.firstName && touched.firstName
                                    }
                                    placeholder="imię"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <Text>{errors.firstName}</Text>
                                ) : (
                                    <span>&nbsp;&nbsp;</span>
                                )}
                            </InputWithError>
                            <InputWithError>
                                <StyledInput
                                    error={errors.lastName && touched.lastName}
                                    wide
                                    placeholder="nazwisko"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <Text>{errors.lastName}</Text>
                                ) : (
                                    <span>&nbsp;&nbsp;</span>
                                )}
                            </InputWithError>
                        </NameInputsWrapper>
                        <InputWithError>
                            <StyledInput
                                error={errors.email && touched.email}
                                placeholder="adres email"
                                type="mail"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Text>{errors.email}</Text>
                            ) : (
                                <span>&nbsp;&nbsp;</span>
                            )}
                        </InputWithError>
                        <InputWithError>
                            <StyledInput
                                error={
                                    errors.phoneNumber && touched.phoneNumber
                                }
                                placeholder="numer telefonu"
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <Text>{errors.phoneNumber}</Text>
                            ) : (
                                <span>&nbsp;&nbsp;</span>
                            )}
                        </InputWithError>
                        {isDriver && (
                            <InputWithError>
                                <StyledInput
                                    placeholder="numer prawa jazdy"
                                    name="drivingLicenseNumber"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.drivingLicenseNumber}
                                />
                                {errors.drivingLicenseNumber &&
                                touched.drivingLicenseNumber ? (
                                    <Text>{errors.drivingLicenseNumber}</Text>
                                ) : (
                                    <span>&nbsp;&nbsp;</span>
                                )}
                            </InputWithError>
                        )}
                        <ButtonsWrapper>
                            <Button
                                wide
                                rounded
                                accept
                                margin="0px 20px"
                                type="submit"
                            >
                                DODAJ
                            </Button>
                            <Button
                                wide
                                rounded
                                cancel
                                margin="0px 20px"
                                type="button"
                                // onClick={handleClose}
                                onClick={() => {
                                    values = {
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        phoneNumber: '',
                                        drivingLicenseNumber: '',
                                    };
                                    formRef.current.resetForm();
                                    handleClose();
                                }}
                            >
                                ANULUJ
                            </Button>
                        </ButtonsWrapper>
                    </StyledForm>
                )}
            </Formik>
        </StyledWrapper>
    );
};

const mapStateToProps = (state) => {};

const InputWithError = styled.div`
    display: flex;
    flex-direction: column;
`;

const NameInputsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
    /* margin-top: 50px; */
    display: flex;
    position: fixed;
    bottom: 350px;
    align-self: center;
`;

export default connect(mapStateToProps)(NewItemBar);
