import { randomInt } from 'crypto';

const generateOTP = () => {
    // Angka acak 6 digit: 100000 - 999999
    // Pakai crypto agar lebih aman dari Math.random()
    return randomInt(100000, 999999).toString();
  };

  export default generateOTP;