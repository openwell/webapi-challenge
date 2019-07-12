// code away!
require("dotenv").config();
const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log(
    `\n*** Server Running on http://localhost:${process.env.PORT} ***\n`
  );
});
