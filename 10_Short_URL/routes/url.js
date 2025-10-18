const express = require("express");
const{handleGenerateNewURL,handleAnalytics,handleRedirectURL} = require('../controllers/url')
const router = express.Router();


router.post("/",handleGenerateNewURL);
router.get("/:shortId",handleRedirectURL);
router.get("/analytics/:shortId",handleAnalytics);

module.exports = router