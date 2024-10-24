const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);
router.get("/getUsers", userController.getAllUsers);
router.delete("/users/:id", userController.delete);
router.put("/user/:id", userController.edit);
module.exports = router;
