// import mongoose from "mongoose";
// import { MongoDB_URI } from "../utils/contant.js";

// const DBCON = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${MongoDB_URI}`
//     );

//     console.log(
//       `✅ MongoDB Connected: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//     process.exit(1);
//   }
// };

// export { DBCON };

import mongoose from "mongoose";
import { MongoDB_URI } from "../utils/contant.js";

const DBCON = async () => {
  try {
    const connectionInstance = await mongoose.connect(MongoDB_URI); // options removed
    console.log(`✅ MongoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export { DBCON };
