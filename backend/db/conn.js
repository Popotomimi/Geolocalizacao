require("dotenv").config();
const mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

mongoose.set("debug", true);

async function main() {
  console.log("Tentando conectar ao MongoDB Atlas...");
  await mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.uonu8.mongodb.net/Geolocalizacao?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  );
  console.log("Conectamos ao MongoDB Atlas!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
