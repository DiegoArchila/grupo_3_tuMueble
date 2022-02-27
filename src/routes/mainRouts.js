/* Imports */
const express = require("express");
const router = express.Router();
const {
  validationsCreateUser,
  validationsPasswords,
} = require("../middleWares/formsMiddleWares.js");

const mainController = require("../controllers/mainController.js");

router.get("/", mainController.home);
router.get("/login", mainController.login);

router.get("/user/create", mainController.showCreateUser);
router.post(
  "/user/create",
  validationsCreateUser,
  mainController.createUser
);

module.exports = router;
