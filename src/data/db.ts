import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/GIGIH");
    // await mongoose.connect("mongodb://127.0.0.1:27017/GIGIH", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB terhubung");
  } catch (error: any) {
    console.error("Koneksi MongoDB gagal:", error.message);
    process.exit(1); // Menghentikan aplikasi jika gagal terhubung ke MongoDB
  }
};

// module.exports = db;
export default db;
