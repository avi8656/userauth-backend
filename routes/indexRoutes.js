const express = require("express");
const router = express.Router();
const {homepage,studentsignup,studentsignin,studentsignout,studentforgrtlink , currentUser, studentsendmail,studentresetpassword} = require('../controllers/indexControllers');
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/",homepage);

// POST/student
router.post("/student/",isAuthenticated,currentUser);



// post /Student/signup
router.post("/student/signup", studentsignup);


// post /Student/signin
router.post("/student/signin", studentsignin);

//GET /Student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

//POST /Student/send-mail
router.post("/student/send-mail", studentsendmail);


//GET /student/forget-link/:studentid
router.get("/student/forget-link/:id",studentforgrtlink );

//POST /student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword);

module.exports = router;
 