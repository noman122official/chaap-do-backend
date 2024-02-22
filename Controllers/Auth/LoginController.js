const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../Models/Users/User');
const UserLoginDetails = require('../../Models/Users/UserLoginDetails');

const LoginController = {
    login: async (req, res) => {
        try {
            const { userId, password } = req.body;

            const user = await User.findOne({ userId });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const userLoginDetails = await UserLoginDetails.findOne({ userId });
            if (!userLoginDetails) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, userLoginDetails.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const payload = {
                user: {
                    id: user.id,
                    email: user.email 
                }
            };
            jwt.sign(
                payload,
                'namandas2201', 
                { expiresIn: '1h' }, 
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
module.exports = LoginController;
