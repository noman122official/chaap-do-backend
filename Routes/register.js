const { Router } = require( 'express');
const router = Router();
const signUpController = require( '../Controllers/Auth/SignUpController');

router.post('/register', async (req, res) => {
    try {
        await signUpController.register(req, res);   
        console.log("done 1")     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
