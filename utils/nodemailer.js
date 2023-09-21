const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req,res,next,url) =>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        host : "smtp.gmail.com",
        port:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        }
    });

    const mailOpitions = {
        from:"Avi Private Limited",
        to:req.body.email,
        subject:"Password Reset Link",
        // text:"Do not share this link with any one",
        html:`
            <h1>Click below to rest password</h1>
            <a  href="${url}">Reset Password Link</a>
            `
            // <a href="${url}">Password Reset link</a>

    }

    transport.sendMail(mailOpitions,(err,info)=>{
      if(err) return next(new ErrorHandler(err,500));
      console.log(info);
      return res.status(200).json({message:"mail sent successfuly!",url});
    })
}
