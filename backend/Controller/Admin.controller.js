

 



import { Cart } from "../models/Cart.model.js";
import { Order } from "../models/Order.model.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import { User } from "../models/User.model.js";

const CreateProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, isActive } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Convert to numbers
    const priceNum = Number(price);
    const stockNum = Number(stock);

    // Validation
    if (
      !title ||
      !description ||
      isNaN(priceNum) ||
      isNaN(stockNum) ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    // Image check
    if (!req.file?.path) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // Upload to Cloudinary
    const uploadImage = await uploadOnCloudinary(req.file.path);

    if (!uploadImage?.secure_url) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price: priceNum,
      stock: stockNum,
      category,
      images: [uploadImage.secure_url],
      createdBy: req.user._id, // auth middleware required
      isActive: isActive ?? true
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const updateProduct = async(req,res) => {
  try {
    const {title, description, price, stock, category,isActive } = req.body;
    const {id} = req.params;

    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success:false,
        message:"Product Not Found"
      });
    }

    let imageUrl = product.images[0];

    if (req.file?.path) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);
      if (uploadedImage) {
        imageUrl = uploadedImage.secure_url;
      }
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.stock = stock;
    product.category = category;
    product.isActive = isActive ?? product.isActive;
    product.images = [imageUrl];

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async(req,res) =>{


  try {
    const {id} = req.params;


    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(400).json({
        success:false,
        message:"Product Not Found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Product Deleted SuccessFully"
    })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      })
  }
}



// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user._id;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "Product and quantity are required" });
    }
    const product = await Product.findById(productId)
    if (product) {
      
    }

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({
        user,
        products: [{ productId, quantity: Number(quantity) }]
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        cart.products.push({ productId, quantity: Number(quantity) });
      }
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Product added to cart", data: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Cart
// const getCart = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const cart = await Cart.findOne({ user: userId }).populate("products.productId");
//     return res.status(200).json({ success: true, data: cart });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId })
      .populate("products.productId");

    if (!cart) {
      return res.status(200).json({ success: true, data: null });
    }

    
    cart.products = cart.products.filter(
      (item) => item.productId !== null
    );

    await cart.save();

    return res.status(200).json({ success: true, data: cart });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove from Cart
const removeCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ success: false, message: "Cart Not Found" });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    return res.status(200).json({ success: true, message: "Product removed from cart", data: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


 


// Example: Total Users Controller
// controllers/adminController.js
;

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role }, // ✅ id not _id
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    // ✅ Safe cookie options for localhost
res
  .status(200)
  .cookie("accessToken", token, {
    httpOnly: true,
  secure: true,       // HTTPS required on Render
  sameSite: "none"   // localhost safe
  })
  .json({
    success: true,
    message: "Admin login successful"
  });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Example: Total Users Controller
const TotalUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// export { adminLogin, TotalUser };



const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    let total = 0;
    const orderProducts = cart.products.map(item => {
      total += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      };
    });

    // Update stock for each product
    for (const item of cart.products) {
      const product = await Product.findById(item.productId._id);
      if (product) {
        product.stock -= item.quantity;
        if (product.stock < 0) product.stock = 0;
        await product.save();
      }
    } 

    // Create the order
    const order = await Order.create({
      user: userId,
      products: orderProducts,
      totalAmount: total
    });

    // Clear the cart after placing order
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};




const Orderhistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).populate("products.productId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found"
      });
    }

    return res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "delivered";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order marked as delivered",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const fetchUser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ✅ await added

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Users Not Found"
      });
    }

    return res.status(200).json({   // ✅ 200 for success
      success: true,
      data: users
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
const getAllOrders = async (req,res) => {
  const orders = await Order.find()
    .populate("user", "username email")
    .populate("products.productId", "title price");

  res.status(200).json({ success:true, data: orders });
};

const UserData = async(req,res) => {
  try {
    const user = await User.find().select("-password")
    if (!user) {
      return res.status(404).json({
        success:false,
        message:"User Not Founds"
      })
    }
       return res.status(200).json({
        success:true,
        data:user
      })
  } catch (error) {
    console.log(error);
    
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔒 Admin khud ko delete nahi kar sakta
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete himself",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// const TotlaUser = async(req,res) => {
//   try {
//     const totalUser = await User.countDocuments({role:"user"})

//     if (!totalUser) {
//       return res.status(404).json({
//         success:false,
//         message:"Total User Not Found"
//       })
//     }
//     return res.status(400).json({
//       success:true,
//       data:totalUser
//     })
//   } catch (error) {
//     console.log(error);
    
//   }
// }


const totalOrders = async(req,res) => {


  try {
    const order = await Order.countDocuments();
    if (!order) {
      return res.status(404).json({
        success:false,
        message:"Order Not Found"
      })
    }

    return res.status(200).json({
      success:true,
      data:order
    })
  } catch (error) {
    console.log(error);
    
  }

}
// Route









export { totalOrders,deleteUser,UserData,CreateProduct,updateProduct,deleteProduct,addToCart,getCart,removeCart,placeOrder,Orderhistory,updateOrderStatus,fetchUser,getAllOrders,TotalUser,adminLogin };
