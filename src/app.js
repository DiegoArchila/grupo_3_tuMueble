/* IMPORTS */
const express=require("express");
const app=express();
const indexRouter=require("./routes/mainRouts.js");
const cartRouter=require('./routes/cartRouts.js');
const adminRouter=require('./routes/adminRouts.js');

/* Settings */
const PORT=process.env.PORT || 3003;
app.use(express.static("public"));

/* Template Engine */
app.set("view engine", "ejs");
app.set("views", "./src/views/");

app.use(express.urlencoded({ extended:false }));

/* Routes Asignations */
app.use(indexRouter);
app.use(cartRouter);
app.use(adminRouter);


/* Start Server */
app.listen(PORT, () => { 
    console.log("Server running in port",PORT);
});