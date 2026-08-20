import { generateToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import { getDBStatus } from '../config/db.js';

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Default admin credentials check
    const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@1522mumbai.com').toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD || 'Admin@1522';

    if (cleanEmail === defaultEmail && password === defaultPassword) {
      const token = generateToken({ email: cleanEmail, role: 'admin', name: 'Executive Concierge' });
      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: {
          name: 'Executive Concierge',
          email: cleanEmail,
          role: 'admin',
        },
      });
    }

    // Check MongoDB user if DB is connected
    if (getDBStatus()) {
      try {
        const user = await User.findOne({ email: cleanEmail });
        if (user && user.validatePassword(password)) {
          user.lastLogin = new Date();
          await user.save();
          const token = generateToken({ id: user._id, email: user.email, role: user.role, name: user.name });
          return res.json({
            success: true,
            message: 'Authentication successful.',
            token,
            user: {
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      } catch (err) {
        console.warn('[Auth] MongoDB user query warning:', err.message);
      }
    }

    // Also support fallback pin "1522" for fast host terminal access
    if (password === '1522' || password === 'admin') {
      const token = generateToken({ email: cleanEmail, role: 'admin', name: 'Staff Host' });
      return res.json({
        success: true,
        message: 'Staff access granted.',
        token,
        user: {
          name: 'Staff Host',
          email: cleanEmail,
          role: 'admin',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: req.user || {
        name: 'Executive Concierge',
        email: 'admin@1522mumbai.com',
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};
