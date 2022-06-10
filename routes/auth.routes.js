const authentication = require('../controllers/consultas');
const express = require("express");
const router = express.Router();

router.post("/signup", authentication.signUp);

router.post("/signin", authentication.signIn);

module.exports = router;