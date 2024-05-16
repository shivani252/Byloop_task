const validName = (value, error, key, keyValue) => {
  const nameRegex = /^[A-Za-z\s\-]{2,}$/;
  if (!value) error[key] = `Please enter ${keyValue}`;
  else if (!nameRegex.test(value))
    error[key] = `Please enter valid  ${keyValue}`;

  return error;
};
const validEmail = (value, error, key, keyValue) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) error[key] = `Please enter ${keyValue}`;
  else if (!(value && emailRegex.test(value)))
    error[key] = `Please enter valid  ${keyValue}`;
  return error;
};
const validContact = (value, error, key, keyValue) => {
  const cleanPhoneNumber = value && value.replace(/\D/g, "");
  const phoneNumberRegex = /^[\d\s\-()+]+$/;
  if (!value) error[key] = `Please enter ${keyValue}`;
  else if (!phoneNumberRegex.test(value) || cleanPhoneNumber.length !== 10)
    error[key] = `Please enter valid ${keyValue}`;
  return error;
};

const validPassword = (value, error, key, keyValue) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!value) error[key] = `Please enter ${keyValue}`;
  else if (!passwordRegex.test(value))
    error[key] = `Please enter valid ${keyValue}`;
  return error;
};
export const isValidConformPassword = (
  password,
  confirmPassword,
  error,
  key,
  keyValue
) => {
  if (!confirmPassword) error[key] = `Please enter ${keyValue}`;
  if (password !== confirmPassword)
    error[key] = `Confirm Password do not match password`;
  return error;
};

export const isEmpty = (value, error, key, keyValue) => {
  if (!value)
    error[key] = `Please enter ${keyValue}`;
  return error
}

export const isNumeric = (value, error, key, keyValue) => {
const   numericRegex = /^[0-9]+$/;
  if (!value)
    error[key] = `Please enter ${keyValue}`;
  else if (!(numericRegex.test(value)))
    error[key] = `Please enter valid ${keyValue}`;
  return error
}

export { validName, validEmail, validContact, validPassword };
