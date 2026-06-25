const express = require("express");
const router = express.Router();

import * as adminValidation from "../Validation/adminValidation";
import * as adminController from "../Controller/AdminController";

router.post("/login", adminValidation.loginValidation, adminController.login);

module.exports = router;