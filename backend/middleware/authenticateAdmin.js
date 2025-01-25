import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const authenticateAdmin = async (req, res, next) => {
  console.log('authenticateAdmin', req.headers);
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    console.log(decoded);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authenticateAdmin;
