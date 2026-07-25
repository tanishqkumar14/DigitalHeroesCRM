const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

// Register
exports.register = async (req, res) => {
  try {
    const error = validateRegister(req.body);

    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const error = validateLogin(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};