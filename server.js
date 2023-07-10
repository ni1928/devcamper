 const express=require("express");
 const connectDB=require(`./config/db`)
 const dotenv=require("dotenv");
 const colors=require(`colors`);
//  const connectDB=require(`./config/db`)
 const errorHandler=require(`./middleware/middleware`)
 const morgan=require('morgan');
//  const connectDB=require(`./config/db`)


//  connect ro database
connectDB();
//  load env vars

dotenv.config({path:"./config/config.env"});


//  route files

const bootcapms=require(`./routes/bootcamp`);

const app=express();

// body parser
app.use(express.json());

app.use(errorHandler);

// dev login middleware
if(process.env.NODE_ENV===`development`){
    app.use(morgan(`dev`))
}

// Mount routers
app.use(`/api/v1/bootcamps`, bootcapms);

const PORT=process.env.PORT|| 5000;

app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));