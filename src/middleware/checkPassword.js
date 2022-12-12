async function passwordValidation(password) {
    const regexPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/);
    const result = regexPass.test(password);
    if (result) {
        return (true);
    } else {
        return (false);
    }
}

module.exports = {
    passwordValidation
}