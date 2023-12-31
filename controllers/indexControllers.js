const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel');
const { sendtoken } = require("../utils/SendToken");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");

exports.homepage = catchAsyncErrors(async(req,res,next)=>{
        res.json({message:"Secure homepage"});
});

exports.currentUser = catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
    res.json({student});
});
 
exports.studentsignup = catchAsyncErrors(async(req,res,next)=>{
    // res.json(req.body);
    const student = await new Student(req.body).save();
    sendtoken(student, 201 ,res)
});

exports.studentsignin = catchAsyncErrors(async(req,res,next)=>{
   const student = await Student.findOne({email : req.body.email})
   .select("+password")
   .exec();

   if(!student) return next(new ErrorHandler("user not found with this email", 404));

   const isMatch = student.comparepassword(req.body.password);
   if(!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));
   sendtoken(student, 200 ,res)

});

exports.studentsignout = catchAsyncErrors(async(req,res,next)=>{
   res.clearCookie("token");
   res.json({message:"successfully signout"})
});

exports.studentsendmail = catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findOne({email:req.body.email});
    if(!student) return next(new ErrorHandler("user not found with this email", 404));
    
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    sendmail(req,res,next,url);    
    student.resetPasswordToken = "1";
    await student.save();
    res.json({student,url})
 });


 exports.studentforgrtlink = catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.params.id).exec();
    if(!student) return next(new ErrorHandler("user not found with this email", 404));
    
    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken= "0";
        student.password = req.body.password;
        await student.save();
    }else{
        return next(new ErrorHandler("Link Expire try again !", 500));
    }
    res.status(200).json({message:"password changed !"})
 });


 
 exports.studentresetpassword = catchAsyncErrors(async(req,res,next)=>{
    const student = await Student.findById(req.id).exec();
        student.password = req.body.password;
        await student.save();
    
    sendtoken(student, 201, res);
 });