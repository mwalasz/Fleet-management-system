import * as Yup from 'yup';
import {
    ONLY_DIGITS,
    ONLY_DIGITS_AND_LETTERS,
    ONLY_LETTERS,
    PHONE_NUMBER,
} from '../utils/regex';

const phoneValidation = Yup.string()
    .required('Numer telefonu jest wymagany!')
    .matches(PHONE_NUMBER, 'Numer telefonu jest nieprawidłowy!')
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
            .matches(ONLY_LETTERS, 'Dozwolone są tylko litery!')
            .required('Imię jest wymagane!'),
        lastName: Yup.string()
            .min(2, 'Zbyt krótkie nazwisko!')
            .max(20, 'Zbyt długie nazwisko!')
            .matches(ONLY_LETTERS, 'Dozwolone są tylko litery!')
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
        .matches(ONLY_LETTERS, 'Dozwolone są tylko litery!')
        .required('Miejscowość jest wymagana!'),
    addressStreet: Yup.string()
        .min(2, 'Zbyt krótka nazwa ulicy!')
        .required('Ulica jest wymagana!'),
    mail: mailValidation,
    nip: Yup.string()
        .length(10, 'Numer NIP musi zawierać 10 cyfr!')
        .required('Numer NIP  jest wymagany!'),
    phoneNumber: phoneValidation,
    managerMail: mailValidation,
});

//DODAĆ DATY!!!
export const NewVehicleValidationSchema = Yup.object().shape({
    brand: Yup.string().required('Nazwa jest wymagana!'),
    model: Yup.string().required('Nazwa jest wymagana!'),
    licensePlate: Yup.string()
        .length(7, 'Rejestracja musi zawierać 7 znaków!')
        .matches(ONLY_DIGITS_AND_LETTERS, 'Dozwolone są tylko cyfry i litery!')
        .required('Tablica rejestracyjna jest wymagana!'),
    vin: Yup.string()
        .length(17, 'Numer vin musi zawierać 17 znaków!')
        .matches(
            ONLY_DIGITS_AND_LETTERS,
            "Dozwolone są tylko cyfry i litery oprócz 'I', 'O' oraz 'Q'!"
        )
        .required('Tablica rejestracyjna jest wymagana!'),
    kmMileage: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(1, 'Zbyt krótki przebieg!')
        .max(9, 'Zbyt długi przebieg!')
        .required('Przebieg jest wymagany!'),
    yearOfProduction: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .length(4, 'To nie jest poprawny rok!')
        .required('Rok jest wymagany!'),
    engineCapacity: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(3, 'Za mała pojemność!')
        .max(5, 'Za duża pojemność!')
        .required('Pojemność jest wymagana!'),
    horsepower: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(1, 'Za mała moc!')
        .max(4, 'Za duża moc!')
        .required('Moc jest wymagana!'),
    torque: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(1, 'Za mały moment obrotowy!')
        .max(4, 'Za duży moment obrotowy!')
        .required('Moment obrotowy jest wymagany!'),
    cylinderNumber: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(1, 'Zbyt mała liczba cylindrów!')
        .max(2, 'Zbyt duża liczba cylindrów!')
        .required('Liczba cylindrów jest wymagana!'),
    curbWeight: Yup.string()
        .matches(ONLY_DIGITS, 'Dozwolone są tylko cyfry!')
        .min(1, 'Zbyt mała waga!')
        .max(5, 'Zbyt duża waga!')
        .required('Waga jest wymagana!'),
    engineType: Yup.string().required('Typ silnika jest wymagany!'),
    driveType: Yup.string().required('Typ napędu jest wymagany!'),
});
