import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.model.js";

const generateaccessToken = (userid) => {
  const user = User.findById(userid);

  const accessToken = user.generateAccessToken();
  req.accessToken = accessToken;
  user.save({ validatebeforeSave: false });
  return { accessToken }; 
};

const RigisterUser = async (req, res) => {
  try {
    const { username, fullname, email, password, contact, address, role } =
      req.body;

    if (
      [username, fullname, email, password, contact, address].some(
        (ele) => !ele || ele.trim() === ""
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existedUser = await User.findOne({ $or: [{ email }, { contact }] });
    if (existedUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const newUser = await User.create({
      username,
      fullname,
      email,
      password,
      contact,
      address,
      role: role === "admin" ? "admin" : "user",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("User Register Error", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if ([email, password].some((ele) => !ele || ele.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await user.isCorrectPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const accessToken = user.generateAccessToken();

    // Remove password
    const loggedinUser = await User.findById(user._id).select("-password");

    // Cookie options
    // const options = { httpOnly: true, secure: true }; // localhost
    const options = {
     httpOnly: true,
  secure: true,       // HTTPS required on Render
  sameSite: "none"   // allows cookie to be sent from frontend
};

 
    // Send response
   // Send response with cookie
return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .json({
    success: true,
    message: "User login successfully",
    user: {
      ...loggedinUser._doc,
      accessToken,
    },
  });

  } catch (error) {
    console.log("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const GetAllProducts = async(req,res) => {
  try {
    const product = await Product.find({isActive:true})

    if (!product) {
       return res.status(404).json({
        success:false,
        message:"Product Not FOund"
       })
    }

    return res.status(200).json({
      success:true,
      data:product,
      message:" All Product fetched SuccessFully" 
    })
  } catch (error) {
    console.log(error);
    
  }
}
const SingleProduct = async(req,res) => {
 try {

  const {id} = req.params;

   const product = await Product.findById(id)
 
   if (!product) {
     return res.status(400).json({
       success:false,
       message:"Product NOt FOund"
     })
   }
 
   return res.status(200).json({
     success:true,
     message:"Prodecu Fetched Successfully",
     data:product
   })
 } catch (error) {
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })
  
 }

}
const logoutUser = async (req,res) => {
  try {
 

 await User.findByIdAndUpdate(
  req.user._id,{
    $set:{
accessToken:undefined
    }
  
  }
 )
 const options = {
  httpOnly:true,
  secure:false
 }
 return res.status(200)
 .clearCookie("accessToken",options)
 .json({
  success:true,
  message:"User Logout SuccessFully"
 })
  } catch (error) {
    console.log(error);
    
  }
}


export { RigisterUser, LoginUser,GetAllProducts,SingleProduct ,logoutUser};
