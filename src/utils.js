// Catch individual filters & return error, if no conditions caught
export const validateField = (type="text", value, isRequired=false, name="Field") => {
    if (type === 'email') {
        const isValidEmail = emailValidator(value);
        console.log('isValidEmail', isValidEmail);

        if (!isValidEmail)
            return `Enter a valid Email`;
    }

    // Empty field 'text' field
    if (isRequired && value.length == 0) {
        return capitalize(`${name} field cannot be empty`);
    }

    return null;
}

// Capitalize first letter of the String
export const capitalize = str => {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// No email regex that's 100%, use below regex rather than reinventing wheel
// https://emailregex.com/
export const emailValidator = testStr => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(testStr);
}
