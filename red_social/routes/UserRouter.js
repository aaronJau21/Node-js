const { Router } = require("express");
const { register, login, profile, list, update } = require("../controllers/UsersController");
const authMiddleware = require("../middleware/AuthMiddleware.js");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", authMiddleware, profile);
router.get("/list/:page?", authMiddleware, list);
router.put("/update", authMiddleware, update);

module.exports = router;
