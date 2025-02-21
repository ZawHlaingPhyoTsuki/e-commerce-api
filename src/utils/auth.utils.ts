import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string)=> {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const ACCESS_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: "1h" });
};

export const generateRefreshToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const comparePasswords = async (
  dbPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(dbPassword, hashedPassword);
};

export const verifyRefreshToken =  (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_SECRET);
};  
