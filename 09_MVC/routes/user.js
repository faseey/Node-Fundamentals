const express = require("express");
const {handleGetAllUsers,handleGetUserById,handleDeleteById,handleupdateUserByID, handleCreateUser} = require("../controllers/user")
const router = express.Router(); // will work as user



router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleupdateUserByID)
.delete(handleDeleteById)

module.exports = router;
