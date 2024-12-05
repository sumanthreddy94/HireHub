export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  console.log("Token received:", token);
  const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
  const options = {
    expires: new Date(Date.now() + expiresIn),
    httpOnly: true,
  };
  console.log()
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};