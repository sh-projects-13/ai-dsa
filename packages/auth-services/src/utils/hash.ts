import bcrypt from "bcryptjs";

export const hashData = async (plain: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT!));
  return await bcrypt.hash(plain, salt);
};

export const verifyHashedData = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
