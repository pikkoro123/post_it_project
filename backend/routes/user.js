const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user');

// ต้องมี / ไม่งั้นมันจะเคลีย req.header ทิ้ง
router.post("/signup", UserController.createUser);

router.post('/login', UserController.userLogin);

module.exports = router;
