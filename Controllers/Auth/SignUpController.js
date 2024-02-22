const bcrypt = require('bcrypt');
const User = require('../../Models/Users/User');
const UserLoginDetails = require('../../Models/Users/UserLoginDetails');
const UserAccessDetails = require('../../Models/Users/UserAccess');
const mongoose = require('mongoose');



const SignUpController = {
    register: async (req, res) => {
        try {
            console.log("reached here")
            const { userId, name, gender, dob, age, email, phoneNumber, password } = req.body;
            console.log("reached here1")
            const validationResult = validateDuplicate(userId, phoneNumber, email);
            console.log("reached here2")
            if (!(await validationResult).isValid) {
                console.log("validation result", validationResult.errorMessage)
                return res.status(200).json({ message: "Existing User." });   
            }
            try{
                const newUser = new User({
                    userId,
                    name,
                    gender,
                    dob,
                    age,
                    email,
                    phoneNumber,
                });
                await newUser.save();
                console.log('2')
                try{
                    const newUserLoginDetails = new UserLoginDetails({
                        userId,
                        password
                    })
                    await newUserLoginDetails.save();
                    console.log('3')
                    try{
                        const type = "User";
                        const newUserAccessDetails = new UserAccessDetails({
                            userId,
                            type
                        })
                        await newUserAccessDetails.save();
                        console.log('4')
                    }catch(e){
                        console.error(e);
                    }
                }catch(e){
                    console.error(e)
                }
            }catch(e){
                console.error(e);
            }

            return res.status(200).json({ message: "User registered successfully" });

            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

const validateDuplicate = async function(username, phoneNumber, email){
    try {
        const existingEmail = await User.findOne({ email });
        const existingPhone = await User.findOne({ phoneNumber });
        const existingUserId = await User.findOne({ username });

        if (existingUserId) {
            return ({ isValid: false, errorMessage: "Username already exists" });
        }
        if (existingEmail) {
            return { isValid: false, errorMessage: "Email already exists" };
        }
        if (existingPhone) {
            return { isValid: false, errorMessage: "Phone number already exists" };
        }else{
        return { isValid: true, errorMessage: null };
        }
    } catch (error) {
        console.error("Error in validateDuplicate:", error);
        return { isValid: false, errorMessage: "Error validating duplicate data" };
    }
}


module.exports = SignUpController;
