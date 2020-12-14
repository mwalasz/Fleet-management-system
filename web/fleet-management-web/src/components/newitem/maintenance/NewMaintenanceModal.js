// import React, { useRef, useState } from 'react';
// import styled from 'styled-components';
// import Modal from '../../Modal';
// import { connect } from 'react-redux';
// import { Formik, Form } from 'formik';
// import axios from 'axios';
// import { API_URL, USER_ROLES_DESCRIPTION } from '../../../utils/constans';
// import Select from '../../Select';
// import { newUserValidationSchema } from '../../../utils/validations';
// import NewItemInput from '../NewItemInput';
// import NewItemBottomButtons from '../NewItemBottomButtons';
// import { StyledForm, TwoInputsInRowWrapper } from '../FormComponents';
// import SelectWrapper from '../SelectWrapper';

// const NewMaintenanceModal = ({
//     isVisible,
//     handleClose,
//     vehicle,
//     addedNew,
//     user,
// }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');
//     const formRef = useRef(null);

//     return (
//         <>
//             <Modal
//                 isVisible={isVisible}
//                 handleClose={handleClose}
//                 error={error}
//                 isLoading={isLoading}
//                 title={'Dodaj nowe tankowanie'}
//                 wide
//             >
//                 <Formik
//                     innerRef={formRef}
//                     initialValues={{
//                         firstName: '',
//                         lastName: '',
//                         email: '',
//                         password: '',
//                         phoneNumber: '',
//                         drivingLicenseNumber: '',
//                     }}
//                     onSubmit={async (values) => {
//                         formRef.current
//                             .validateForm()
//                             .then(console.log('validation'));
//                         setIsLoading(true);
//                         setError('');

//                         const payload = values;

//                         // await axios
//                         //     .post(
//                         //         `${API_URL}/${
//                         //             isDriver ? 'drivers' : 'managers'
//                         //         }/add`,
//                         //         payload,
//                         //         {
//                         //             withCredentials: true,
//                         //             headers: {
//                         //                 Authorization: 'Bearer ' + user.token,
//                         //             },
//                         //         }
//                         //     )
//                         //     .then((res) => {
//                         //         const error = res.data.result;
//                         //         if (
//                         //             typeof error === 'string' &&
//                         //             error.includes('Błąd' || 'Error')
//                         //         ) {
//                         //             console.log('error');
//                         //             setError(error);
//                         //         } else {
//                         //             setRefresh();
//                         //             formRef.current.resetForm();
//                         //             setError('');
//                         //             setTimeout(handleClose, 1000);
//                         //         }
//                         //     })
//                         //     .catch((error) => {
//                         //         setError(error.toString());
//                         //         console.log(
//                         //             `Error while user's attempt send data: ${error}`
//                         //         );
//                         //     });
//                         setIsLoading(false);
//                     }}
//                     // validationSchema={}
//                 >
//                     {({
//                         values,
//                         handleChange,
//                         handleBlur,
//                         errors,
//                         touched,
//                         onSubmit,
//                     }) => (
//                         <StyledForm>
//                             <TwoInputsInRowWrapper>
//                                 <NewItemInput
//                                     wide
//                                     handleChange={handleChange}
//                                     handleBlur={handleBlur}
//                                     errors={errors.firstName}
//                                     touched={touched.firstName}
//                                     value={values.firstName}
//                                     placeholder="imię"
//                                     type="text"
//                                     name="firstName"
//                                 />
//                                 <NewItemInput
//                                     wide
//                                     handleChange={handleChange}
//                                     handleBlur={handleBlur}
//                                     errors={errors.lastName}
//                                     touched={touched.lastName}
//                                     value={values.lastName}
//                                     placeholder="nazwisko"
//                                     type="text"
//                                     name="lastName"
//                                 />
//                             </TwoInputsInRowWrapper>
//                             <NewItemInput
//                                 handleChange={handleChange}
//                                 handleBlur={handleBlur}
//                                 errors={errors.email}
//                                 touched={touched.email}
//                                 value={values.email}
//                                 placeholder="adres email"
//                                 type="mail"
//                                 name="email"
//                             />
//                             <NewItemInput
//                                 handleChange={handleChange}
//                                 handleBlur={handleBlur}
//                                 errors={errors.password}
//                                 touched={touched.password}
//                                 value={values.password}
//                                 placeholder="hasło"
//                                 type="password"
//                                 name="password"
//                             />
//                             <NewItemInput
//                                 handleChange={handleChange}
//                                 handleBlur={handleBlur}
//                                 errors={errors.phoneNumber}
//                                 touched={touched.phoneNumber}
//                                 value={values.phoneNumber}
//                                 placeholder="numer telefonu"
//                                 type="text"
//                                 name="phoneNumber"
//                             />
//                             <NewItemBottomButtons
//                                 onSubmit={onSubmit}
//                                 resetForm={() => {
//                                     formRef.current.resetForm();
//                                     setError('');
//                                     handleClose();
//                                 }}
//                             />
//                         </StyledForm>
//                     )}
//                 </Formik>
//             </Modal>
//         </>
//     );
// };

// export default NewMaintenanceModal;
