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
                    brand: '',
                    model: '',
                    licensePlate: '',
                    vin: '',
                    kmMileage: '',
                    curbWeight: '',
                    yearOfProduction: '',
                    technicalInspectionDate: '2020-12-13T19:30:35.374Z',
                    insuranceInspectionDate: '2020-12-13T19:30:35.374Z',
                    engineCapacity: '',
                    horsepower: '',
                    torque: '',
                    cylinderNumber: '',
                    engineType: '',
                    driveType: '',
                }}
                onSubmit={async (values) => {
                    setIsLoading(true);
                    formRef.current
                        .validateForm()
                        .then(console.log('validation'));
                    setIsLoading(true);
                    setError('');

                    const payload = values;
                    payload['companyManagerMail'] = user.email;
                    payload['kmMileage'] = parseFloat(values.kmMileage);
                    payload['curbWeight'] = parseFloat(values.curbWeight);
                    payload['yearOfProduction'] = parseFloat(
                        values.yearOfProduction
                    );
                    payload['engineCapacity'] = parseFloat(
                        values.engineCapacity
                    );
                    payload['horsepower'] = parseFloat(values.horsepower);
                    payload['torque'] = parseFloat(values.torque);
                    payload['cylinderNumber'] = parseFloat(
                        values.cylinderNumber
                    );

                    console.log('payload', payload);

                    await axios
                        .post(`${API_URL}/vehicles/add`, payload, {
                            withCredentials: true,
                            headers: {
                                Authorization: 'Bearer ' + user.token,
                            },
                        })
                        .then((res) => {
                            setIsLoading(false);
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
                            setIsLoading(false);
                            const errorMessage =
                                error.response.data.responseException
                                    .exceptionMessage;
                            setError(`Błąd: ${errorMessage}`);
                            console.log(
                                `Błąd w trakcie próby dodania nowego pojazdu: ${errorMessage}`
                            );
                        });
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
                                marginBottom: '20px',
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
                                        isVisible && data && data.brands
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
                                        isVisible &&
                                        data.brands &&
                                        selectedBrand
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
                                justifyContent: 'space-evenly',
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
                                        isVisible && data.driveTypes
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
                                        isVisible && data.engineTypes
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
                                caps
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
                                caps
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
                                wide
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
                                wide
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
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.horsepower}
                                touched={touched.horsepower}
                                value={values.horsepower}
                                placeholder="moc [km]"
                                type="text"
                                name="horsepower"
                            />
                            <NewItemInput
                                wide
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
                        <TwoInputsInRowWrapper>
                            <NewItemInput
                                wide
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
                                wide
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.cylinderNumber}
                                touched={touched.cylinderNumber}
                                value={values.cylinderNumber}
                                placeholder="ilość cylindrów"
                                type="text"
                                name="cylinderNumber"
                            />
                        </TwoInputsInRowWrapper>
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
