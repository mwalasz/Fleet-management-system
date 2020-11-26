import * as Yup from 'yup';
import { onlyLettersRegex, phoneNumberRegex } from '../utils/constans';

export const NewUserValidationSchema = Yup.object().shape({
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
        .matches(phoneNumberRegex, 'Numer telefonu jest nieprawidłowy!')
        .min(9, 'Numer telefonu jest zbyt krótki!')
        .max(9, 'Numer telefonu jest zbyt długi!'),
    drivingLicenseNumber: Yup.string()
        .length(9, 'Numer musi zawierać 9 cyfr!')
        .notRequired(),
    // .required('Numer prawa jazdy jest wymagany!'),
    password: Yup.string()
        .min(4, 'Hasło musi zawierać co najmniej 4 znaki!')
        .required('Hasło jest wymagane!'),
});
