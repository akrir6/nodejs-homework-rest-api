require("dotenv").config();
const app = require("./app");
const connectMongoDB = require("./db/connection");

const PORT = process.env.PORT || 3000;

connectMongoDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  });
