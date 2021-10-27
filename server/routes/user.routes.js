const router = require('express').Router();
const {checkUser, requireAuth} = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();

// auth
router.get("/validation/:uniqueString", authController.validateUser);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

// user DB
router.get("/roled", requireAuth, userController.getRoledUsers);
router.get("/all", userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.get("/favorites-posts/:id", requireAuth, userController.favoritesPosts)
router.patch("/update/password/:id", requireAuth, userController.changePassword);
router.patch("/admin/disable/:id", requireAuth, userController.setDisableUserTrue);
router.patch("/admin/enable/:id", requireAuth, userController.setDisableUserFalse);
router.patch("/admin/update/:id", requireAuth, userController.updateUserFromAdmin);
router.patch("/:id", requireAuth, userController.updateUser);
router.patch("/follow/:id", requireAuth, userController.follow);
router.patch("/unfollow/:id", requireAuth, userController.unfollow);
router.delete("/:id", requireAuth, userController.deleteUser);

// upload
router.post("/upload",  upload.single("file"), uploadController.uploadProfil);

module.exports = router;