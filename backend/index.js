
import "dotenv/config"; // ✅ THIS IS THE MAGIC LINE

import { app } from "./app.js";
import { DBCON } from "./DB/index.js";

console.log("ENV TEST (index):", process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT || 4000;

DBCON().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
