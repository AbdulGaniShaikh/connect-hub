const hasMinimumLength = (password) => password.length >= 8;
const hasDigit = (password) => /[0-9]/.test(password);
const hasLowercase = (password) => /[a-z]/.test(password);
const hasUppercase = (password) => /[A-Z]/.test(password);
const hasSymbol = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

const checkPasswordCriteriaMap = (password) => ({
  size: hasMinimumLength(password),
  digit: hasDigit(password),
  lower: hasLowercase(password),
  upper: hasUppercase(password),
  symbol: hasSymbol(password)
});

const isValidPassword = (password) => {
  return (
    hasMinimumLength(password) &&
    hasDigit(password) &&
    hasLowercase(password) &&
    hasUppercase(password) &&
    hasSymbol(password)
  );
};

const isValidUsername = (username) => {
  return username.length >= 3 && /^[a-z0-9_]+$/.test(username);
};

const isValidEmail = (email) => {
  return email.length > 4 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export { isValidPassword, checkPasswordCriteriaMap, isValidUsername, isValidEmail };
