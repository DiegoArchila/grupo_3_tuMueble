/* IMPORTS */
const express = require("express");
const { encrypt } = require("./lib/formats.js")
const app = express();
const indexRouter = require("./routes/mainRouts.js");
const cartRouter = require("./routes/cartRouts.js");
const userRouter=require("./routes/userRouts.js");
const adminRouter = require("./routes/adminRouts.js");
const productsRouter = require("./routes/productsRouts.js");
const session = require("express-session");
const productsApiRouter = require("./routes/apis/ProductsRouts.js");
const productCategoryRouter = require("./routes/apis/ProductCategoryRouts.js");
const logger = require("morgan");

/* Settings */
const PORT = process.env.PORT || 3003;
app.use(express.static("public"));
app.use(session({secret:"asdfi56465f46445641j4546d54f6g"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

//app.use(bodyParser);

/* Template Engine */
app.set("view engine", "ejs");
app.set("views", "./src/views/");

/* Routes Asignations */
app.use(indexRouter);
app.use(cartRouter);
app.use(adminRouter);
app.use(productsRouter);
app.use(userRouter);

/* Apis Routes Asignations */
app.use(productsApiRouter);
app.use(productCategoryRouter);

/* Start Server */
app.listen(PORT, () => {
  console.log("Server running in port", PORT);
});
