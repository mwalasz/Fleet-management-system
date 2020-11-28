import * as Yup from 'yup';
import { onlyLettersRegex, phoneNumberRegex } from '../utils/constans';

const phoneValidation = Yup.string()
    .required('Numer telefonu jest wymagany!')
    .matches(phoneNumberRegex, 'Numer telefonu jest nieprawidłowy!')
    .min(9, 'Numer telefonu jest zbyt krótki!')
    .max(9, 'Numer telefonu jest zbyt długi!');

const mailValidation = Yup.string()
    .email('Niepoprawny adres. Spróbuj ponownie.')
    .required('Mail jest wymagany!');

export const newUserValidationSchema = (isDriver) =>
    Yup.object().shape({
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
        email: mailValidation,
        phoneNumber: phoneValidation,
        drivingLicenseNumber: isDriver
            ? Yup.string()
                  .length(9, 'Numer musi zawierać 9 cyfr!')
                  .required('Numer prawa jazdy jest wymagany!')
            : Yup.string().notRequired(),
        password: Yup.string()
            .min(4, 'Hasło musi zawierać co najmniej 4 znaki!')
            .required('Hasło jest wymagane!'),
    });

export const NewCompanyValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Zbyt krótka nazwa!')
        .max(20, 'Zbyt długa nazwa!')
        .required('Nazwa jest wymagana!'),
    description: Yup.string().max(100, 'Zbyt długi opis!').notRequired(),
    addressCity: Yup.string()
        .min(2, 'Zbyt krótka nazwa miejscowości!')
        .matches(onlyLettersRegex, 'Dozwolone są tylko litery!')
        .required('Miejscowość jest wymagana!'),
    addressStreet: Yup.string()
        .min(2, 'Zbyt krótka nazwa ulicy!')
        .required('Ulica jest wymagana!'),
    mail: mailValidation,
    nip: Yup.string()
        .length(10, 'Numer NIP musi zawierać 10 cyfr!')
        .required('Numer NIP  jest wymagany!'),
    phoneNumber: phoneValidation,
});
