const getEditLabels = (name) => {
    return {
        title          : `Edit ${name}`,
        trigger        : 'Edit',
        cancelButton   : 'Cancel',
        submitButton   : 'Edit',
        successMessage : 'Successful',
        errorMessage   : 'Error occurred'
    };
};

const getDeleteLabels = name => {
    return {
        title          : `Delete ${name}`,
        text           : `Are you sure you want to delete the ${name}?`,
        cancelButton   : 'Cancel',
        submitButton   : 'Delete',
        successMessage : 'Successful',
        errorMessage   : 'Error caused'
    };
};

const dropdownLabel = 'Actions';

const fetchMessage = 'Fetching data';
const emptyMessage = 'No data to display';
const errorMessage = 'Error occurred';

// eslint-disable-next-line quotes
const tipFormat  = "yyyy-MM-dd'T'HH:mm:ssZ";
const dateFormat = 'DD.MM.YYYY HH:mm';


export default {
    fetchMessage,
    emptyMessage,
    errorMessage,
    date: {tipFormat, dateFormat},
    dropdownLabel,
    getEditLabels,
    getDeleteLabels
};
