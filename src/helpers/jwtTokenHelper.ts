import jwt from 'jsonwebtoken';

require('dotenv').config();

export const generateToken = (payload: {id: string, isAdmin: boolean}) => {
  return jwt.sign(
    {
      id: payload.id,
      isAdmin: payload.isAdmin,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );
};

export const verifyToken = (token: string) => {
  if (!token) return false;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    return decodedToken;
  } catch (error) {
    return false;
  }
};
