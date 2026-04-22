import jwt from 'jsonwebtoken';

/**
 * Middleware to check if user has a specific role
 * @param {string|string[]} allowedRoles - Role(s) allowed to access the route
 * @returns {Function} Middleware function
 */
export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
      const userRole = decoded.userType || 'individual';

      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

/**
 * Middleware to check if user is admin
 */
export const isAdmin = checkRole('admin');

/**
 * Middleware to check if user is professional or admin
 */
export const isProfessionalOrAdmin = checkRole(['professional', 'admin']);

/**
 * Middleware to check if user is individual or professional (not admin)
 */
export const isNotAdmin = checkRole(['individual', 'professional']);
