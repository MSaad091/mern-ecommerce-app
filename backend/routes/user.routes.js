import { Router} from "express";
import {GetAllProducts, LoginUser, logoutUser, RigisterUser, SingleProduct} from '../Controller/User.controller.js'
import { verifyJwt, verifyJwtes } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import jwt from "jsonwebtoken";
import { addToCart, adminLogin, CreateProduct, deleteProduct, deleteUser, fetchUser, getAllOrders, getCart, Orderhistory, placeOrder, removeCart, totalOrders, TotalUser, updateOrderStatus, updateProduct, UserData } from "../Controller/Admin.controller.js";
import { upload } from "../middleware/multer.js";
import { adminAuth } from "../middleware/Adminauth.js";

const router = Router();


router.route('/register').post(RigisterUser)
router.route('/login').post(LoginUser)
router.route('/admin/login').post(adminLogin)

router.route('/createproduct')
  .post(verifyJwtes, adminAuth, upload.single('image'), CreateProduct);
  router.route('allorder').get(verifyJwtes,adminAuth,totalOrders)
  router.route('/allproduct').get(GetAllProducts)
  router.route('/product/:id').get(SingleProduct)
  // router.route('allproducts').get(verifyJwtes,isAdmin,GetAllProducts)
 router.route('/update/:id').put(verifyJwtes, isAdmin, upload.single("image"), updateProduct);
 router.route('/delete/:id').delete(verifyJwtes,isAdmin,deleteProduct)
router.route('/add').post(verifyJwt,addToCart)
router.route('/cart').get(verifyJwt,getCart)
router.route('/remove').post(verifyJwt,removeCart)
router.route('/checkout').post(verifyJwt,placeOrder)
router.route('/history').get(verifyJwt, Orderhistory);
router.route('/order/:orderId').put(verifyJwtes,adminAuth,updateOrderStatus)
router.route('/users').get(verifyJwt,isAdmin,fetchUser)
router.route('/allorder').get(verifyJwtes,isAdmin,getAllOrders)
// router.route('/totaluser').get(verifyJwt,adminAuth,TotlaUser)
// router.route('/totaluser').get(verifyJwt, adminAuth, TotlaUser)

router.get("/totaluser", verifyJwtes, adminAuth, TotalUser);
router.route('/all-user').get(verifyJwtes,adminAuth,UserData)
router.route('/delete-user/:id').delete(verifyJwtes,adminAuth,deleteUser)
router.get("/validate", verifyJwt, (req, res) => {
  res.json({ success: true, message: "Token valid" });
});
router.route("/logout").post(verifyJwtes,logoutUser)


// import express from "express";


// const router = express.Router();

const verifysJwt = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

router.get("/validate", verifysJwt, (req, res) => {
  res.json({ success: true, message: "Token valid", user: req.user });
});

// export default router;



export default router