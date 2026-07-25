const validator = require("validator");

exports.validateRegister = ({ name, email, password }) => {

    if (!name || !email || !password)
        return "All fields are required.";

    if (!validator.isEmail(email))
        return "Invalid email.";

    if (password.length < 6)
        return "Password should be at least 6 characters.";

    return null;
};

exports.validateLogin = ({ email, password }) => {

    if (!email || !password)
        return "Email and password required.";

    return null;
};