import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? ''
console.log('jt', process.env.JWT_SECRET)

export const generateToken = (payload: {id: string, isAdmin: boolean}) => {
  return jwt.sign(
    {
      id: payload.id,
      isAdmin: payload.isAdmin,
    },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
};

export const verifyToken = (token: string) => {
  if (!token) return false;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return false;
  }
};
