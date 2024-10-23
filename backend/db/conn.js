require("dotenv").config();
const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

async function main() {
  await mongoose.connect(
    `mongodb+srv://robertoo7:IKtlq7AQPr2nnflP@cluster0.tcnpo.mongodb.net/Geo?retryWrites=true&w=majority&appName=Cluster0`
  );
  console.log("Conectamos ao MongoDB Atlas!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
