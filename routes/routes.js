const route = require('../controllers/consultas');
const express = require("express");
const router = express.Router();


router.get("/participantes", route.getParticipantes)

router.post("/signup", route.signUp);

router.post("/signin", route.signIn);

router.put("/update/:id", route.upDate);

router.put("/status/:id", route.upDateStatus);

router.delete("/deleteParticipante/:id", route.deleteParticipante)


module.exports = router;