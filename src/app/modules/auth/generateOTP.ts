export const generateOTP = () => {
  //Generate OTP of 4 numbers and return it with math.random
  return Math.floor(1000 + Math.random() * 9000);
};
