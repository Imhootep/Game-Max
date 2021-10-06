const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/roled", userController.getRoledUsers);
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.patch("/disabled/:id", userController.setDisableUserTrue);
router.patch("/enabled/:id", userController.setDisableUserFalse);
router.patch("/role", userController.setRole);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;