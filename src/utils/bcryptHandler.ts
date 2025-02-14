import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (
  dbPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(dbPassword, hashedPassword);
};

export const generateToken = (id: string, role: string) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
