const express = require("express");
const{handleGenerateNewURL,handleAnalytics,handleRedirectURL,handleVisiblity} = require('../controllers/url')
const router = express.Router();


router.post("/",handleGenerateNewURL);
router.get("/:shortId",handleRedirectURL);
router.get("/analytics/:shortId",handleAnalytics);
router.post("/visiblity",handleVisiblity);

module.exports = router