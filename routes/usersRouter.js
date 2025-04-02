const express = require('express');
const app = express();
const router = express.Router();
const {registerUser, logoutUser, userLogin} = require('../controllers/authController');

router.get('/login', (req, res) => {
    let error = req.flash('error');
    res.render('login', { error });
});


router.get('/register', (req, res) => {
    let error = req.flash('error');
    res.render('register', { error });
});

router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/logout', logoutUser);

module.exports = router;