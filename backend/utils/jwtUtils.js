import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name, email: user.email, photo: user.photoURL, gender: user.gender, dateOfBirth: user.dateOfBirth, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token tidak valid');
  }
};
