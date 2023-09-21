const { Promise } = require("mongoose");

exports.generatedErrors = (err, req, res, next)=>{
   const statuscode = err.statuscode || 500;

    if(err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")){
      err.message = "This details already exsist"
    }

   res.status(statuscode).json({
     message: err.message,
     errorName : err.name, 
   })
}