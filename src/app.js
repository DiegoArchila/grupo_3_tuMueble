/* IMPORTS */
const express=require("express");
const app=express();
const indexRouter=require("./routes/mainRouts.js");

/* Settings */
const PORT=process.env.PORT || 3000;
app.use(express.static("public"));

/* Template Engine */
app.set("view engine", "ejs");
app.set("views", "./src/views/");

/* Routes Asignations */
app.use(indexRouter);


/* Start Server */
app.listen(PORT, () => { 
    console.log("Server running in port ",PORT);
});