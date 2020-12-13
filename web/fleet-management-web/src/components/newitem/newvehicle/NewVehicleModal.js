import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../Modal';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { API_URL, USER_ROLES_DESCRIPTION } from '../../../utils/constans';
import Select from '../../Select';
import { NewVehicleValidationSchema } from '../../../utils/validations';
import NewItemInput from '../NewItemInput';
import NewItemBottomButtons from '../NewItemBottomButtons';
import { StyledForm, TwoInputsInRowWrapper } from '../FormComponents';
import SelectWrapper from '../SelectWrapper';
import Dropzone from '../../dropzone/Dropzone';

const NewVehicleModal = ({ isVisible, handleClose, setRefresh, user }) => {
    const [isDriver, setIsDriver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${API_URL}/vehicles/get_data_for_new`, {
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            })
            .then((res) => {
                setIsLoading(false);
                const data = res.data.result;

                if (data) {
                    console.log('res.data.result');
                    console.log(data);
                    setData(data);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(
                    `An error occurred while downloading user's vehicles: ${err}`
                );
            });

        setIsLoading(false);
    }, [isVisible]);

    return (
        <Modal
            isVisible={isVisible}
            handleClose={handleClose}
            title={'Dodaj nowy pojazd: '}
            error={error}
            isLoading={isLoading}
        >
            <Formik
                innerRef={formRef}
                initialValues={{
                    companyManagerMail: '',
                    brand: '',
                    model: '',
                    licensePlate: '',
                    vin: '',
                    kmMileage: 0,
                    curbWeight: 0,
                    yearOfProduction: 0,
                    technicalInspectionDate: '2020-12-13T19:30:35.374Z',
                    insuranceInspectionDate: '2020-12-13T19:30:35.374Z',
                    engineCapacity: 0,
                    horsepower: 0,
                    torque: 0,
                    cylinderNumber: 0,
                    engineType: '',
                    driveType: '',
                }}
                onSubmit={async (values) => {
                    formRef.current
                        .validateForm()
                        .then(console.log('validation'));
                    setIsLoading(true);
                    setError('');

                    const payload = values;
                    payload.address = `ul. ${values.addressStreet}, ${values.addressCity}`;
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
                                setError(error);
                            } else {
                                setRefresh();
                                formRef.current.resetForm();
                                setError('');
                                setTimeout(handleClose, 1000);
                            }
                        })
                        .catch((error) => {
                            const errorMessage =
                                error.response.data.responseException
                                    .exceptionMessage;
                            setError(`Błąd: ${errorMessage}`);
                            console.log(
                                `Błąd w trakcie próby dodania nowej firmy: ${errorMessage}`
                            );
                        });
                    setIsLoading(false);
                }}
                validationSchema={NewVehicleValidationSchema}
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
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <SelectWrapper
                                title="Marka:"
                                errors={errors.brand}
                                touched={touched.brand}
                            >
                                <Select
                                    short
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    options={
                                        data && data.brands && isVisible
                                            ? data.brands.map((x) => x.name)
                                            : []
                                    }
                                    value={values.brand}
                                    onClick={(e) => {
                                        setSelectedBrand(
                                            data.brands.find(
                                                (x) => x.name === e.target.value
                                            )
                                        );
                                        values.brand = e.target.value;
                                    }}
                                />
                            </SelectWrapper>
                            <SelectWrapper
                                title="Model:"
                                errors={errors.model}
                                touched={touched.model}
                            >
                                <Select
                                    short
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    options={
                                        data.brands &&
                                        selectedBrand &&
                                        isVisible
                                            ? selectedBrand.models.map(
                                                  (x) => x.name
                                              )
                                            : []
                                    }
                                    value={values.model}
                                    onClick={(e) => {
                                        values.model = e.target.value;
                                    }}
                                />
                            </SelectWrapper>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <SelectWrapper
                                title="Napęd:"
                                errors={errors.driveType}
                                touched={touched.driveType}
                            >
                                <Select
                                    short
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    options={
                                        data.driveTypes && isVisible
                                            ? data.driveTypes
                                            : []
                                    }
                                    value={values.driveType}
                                    onClick={(e) => {
                                        values.driveType = e.target.value;
                                    }}
                                />
                            </SelectWrapper>
                            <SelectWrapper
                                title="Typ silnika:"
                                errors={errors.engineType}
                                touched={touched.engineType}
                            >
                                <Select
                                    short
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    options={
                                        data.engineTypes && isVisible
                                            ? data.engineTypes
                                            : []
                                    }
                                    value={values.engineType}
                                    onClick={(e) => {
                                        values.engineType = e.target.value;
                                    }}
                                />
                            </SelectWrapper>
                        </div>
                        <TwoInputsInRowWrapper>
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.licensePlate}
                                touched={touched.licensePlate}
                                value={values.licensePlate}
                                placeholder="tablica rejestracyjna"
                                type="text"
                                name="licensePlate"
                            />
                            <NewItemInput
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.vin}
                                touched={touched.vin}
                                value={values.vin}
                                placeholder="numer vin"
                                type="text"
                                name="vin"
                            />
                        </TwoInputsInRowWrapper>
                        <TwoInputsInRowWrapper>
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.kmMileage}
                                touched={touched.kmMileage}
                                value={values.kmMileage}
                                placeholder="przebieg [km]"
                                type="text"
                                name="kmMileage"
                            />

                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.yearOfProduction}
                                touched={touched.yearOfProduction}
                                value={values.yearOfProduction}
                                placeholder="rok produkcji"
                                type="text"
                                name="yearOfProduction"
                            />
                        </TwoInputsInRowWrapper>
                        <TwoInputsInRowWrapper>
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.horspower}
                                touched={touched.horspower}
                                value={values.horspower}
                                placeholder="moc [km]"
                                type="text"
                                name="horspower"
                            />
                            <NewItemInput
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.torque}
                                touched={touched.torque}
                                value={values.torque}
                                placeholder="moment obrotowy [Nm]"
                                type="text"
                                name="torque"
                            />
                        </TwoInputsInRowWrapper>
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.engineCapacity}
                            touched={touched.engineCapacity}
                            value={values.engineCapacity}
                            placeholder="pojemność skokowa [cc]"
                            type="text"
                            name="engineCapacity"
                        />
                        <NewItemInput
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.curbWeight}
                            touched={touched.curbWeight}
                            value={values.curbWeight}
                            placeholder="masa [kg]"
                            type="text"
                            name="curbWeight"
                        />
                        <NewItemBottomButtons
                            onSubmit={onSubmit}
                            resetForm={() => {
                                formRef.current.resetForm();
                                setError('');
                                handleClose();
                            }}
                            low
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

export default connect(mapStateToProps)(NewVehicleModal);
