const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userLoginDetailsSchema = new Schema({
    userId:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    }
});

userLoginDetailsSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const UserLoginDetails = mongoose.model('UserLoginDetails', userLoginDetailsSchema);

module.exports = UserLoginDetails;
