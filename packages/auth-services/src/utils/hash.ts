import bcrypt from "bcryptjs";
import { config } from "../conf/config";

export const hashData = async (plain: string) => {
  const salt = await bcrypt.genSalt(config.passwordSalt);
  return await bcrypt.hash(plain, salt);
};

export const verifyHashedData = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
