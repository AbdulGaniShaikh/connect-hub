import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return { success: true, hash };
  } catch (error) {
    return { success: false, error: 'cannot create hash' };
  }
};

export default hashPassword;
