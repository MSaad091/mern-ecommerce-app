// const adminAuth = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

//   if (decoded.role !== "admin") {
//     return res.status(403).json({ message: "Admin only" });
//   }

//   req.admin = decoded;
//   next();
// };

// export {adminAuth}
// middleware/adminAuth.js
import jwt from 'jsonwebtoken';

// const adminAuth = (req, res, next) => {
//   const token = req.cookies.accessToken;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ message: "Admin only" });
//     }

//     req.admin = decoded;
//     next();
//   } catch (error) {
//     console.log("Admin Auth Error:", error.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
const adminAuth = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  next();
};
export { adminAuth };
