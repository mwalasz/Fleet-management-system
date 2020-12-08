import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const Alert = ({
    title,
    visible,
    makeInvisible,
    success,
    error,
    warning,
    long,
}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        makeInvisible();
    };

    const chooseType = () => {
        if (success) return 'success';
        if (error) return 'error';
        if (warning) return 'warning';

        return 'info';
    };

    const chooseMessage = () => {
        if (success) return 'Operacja zakończona pomyślnie!';
        if (error || warning) return 'Coś poszło nie tak!';
        if (warning) return 'Uwaga!';

        return '';
    };
    return (
        <Snackbar
            open={visible}
            autoHideDuration={long ? 4000 : 2000}
            onClose={handleClose}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={chooseType()}
            >
                {title ? (
                    <>
                        <AlertTitle>
                            <strong>{chooseMessage()}</strong>
                        </AlertTitle>
                        {title}
                    </>
                ) : (
                    chooseMessage()
                )}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;
