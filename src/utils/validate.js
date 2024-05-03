export const checkValidData = (email, password, name) => {
  const isEmailValid = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  // Check if name is provided before validating
  const isNameValid = !name || /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  if (!isEmailValid) return "Email id is Not Valid";
  if (!isPasswordValid) return "Password is Not Valid";
  if (!isNameValid) return "Name is Not Valid";

  return null;
};
