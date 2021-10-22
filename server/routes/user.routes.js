const router = require('express').Router();
const {checkUser, requireAuth} = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.get("/validate/:uniqueString", authController.validateUser);
router.post("/login", authController.signIn);
//router.get("/:uniqueString", authController.validateUser);

// user DB
router.get("/roled", requireAuth, userController.getRoledUsers);
router.get("/all", userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.patch("/disabled/:id", requireAuth, userController.setDisableUserTrue);
router.patch("/enabled/:id", requireAuth, userController.setDisableUserFalse);
router.patch("/role/:id", requireAuth, userController.setRole);
router.patch("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);
router.patch("/follow/:id", requireAuth, userController.follow);
router.patch("/unfollow/:id", requireAuth, userController.unfollow);

// upload
router.post("/upload",  upload.single("file"), uploadController.uploadProfil);

module.exports = router;