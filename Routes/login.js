const Router = require( 'express');
const LoginController = require( '../Controllers/Auth/LoginController');

const router = Router();

router.post('/login', async (req, res) => {
    try {
        await LoginController.login(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
