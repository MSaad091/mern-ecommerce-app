import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = user; // attach user to request
    next(); // call next middleware or route
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export { verifyJwt };

// middleware/verifyJwt.js
// import jwt from 'jsonwebtoken';
// import { User } from '../models/User.model.js';

const verifyJwtes = async (req, res, next) => {
  try {
  const token =
  req.cookies?.accessToken ||
  req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }

    // ✅ Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("Decoded Token:", decodedToken);

    // ✅ Use id from token payload
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export { verifyJwtes };
