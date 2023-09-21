exports.sendtoken = (student,statusCode, res) =>{
  const token = student.getjwttoken();

  const opitions = {
    expire : new Date(
        Date.now() + process.env.COOKIE_EXPIRE *24 *60*60*1000
    ),
    httpOnly : true,
    // secure : true,
  } ;
  
  res.status(statusCode)
  .cookie("token",token,opitions)
  .json({success:true, id:student._id, token});
}