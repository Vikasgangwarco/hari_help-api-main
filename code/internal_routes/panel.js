

const express = require("express");
const router = express.Router();


const {performValidationPanel} = require('../utility/authentication_functions.js');


const hariCenterPanelRoute = require("./hari_center/panel");

const filesRoute = require("./files/panel");

const imagesRoute = require("./files/image");



router.use("/",performValidationPanel,hariCenterPanelRoute);

router.use("/files",performValidationPanel,filesRoute);

router.use("/images",performValidationPanel,imagesRoute);





module.exports = router;