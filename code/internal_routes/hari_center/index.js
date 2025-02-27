const express = require("express");
const router = express.Router();

const patientsRoute = require('./patients');
const doctorsRoute = require('./doctors');
const panelRoute = require("./panel");
const {performValidationUser,performValidationDoctor,performValidationPanel} = require('../../utility/authentication_functions.js');

router.use('/patients',performValidationUser,patientsRoute);
router.use('/doctors',performValidationDoctor,doctorsRoute);
// router.use('/panel',performValidationPanel,panelRoute);



router.use('/*',(req,res)=>{
	let ret = {status:"success",message:"404! Welcome to all users api section but it seems you have put in a wrong path that does not exist!"};
	res.json(ret);
});


module.exports=router;
