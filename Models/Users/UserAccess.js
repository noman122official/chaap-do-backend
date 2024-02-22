const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const Schema = mongoose.Schema;

const userAccessSchema = new Schema({
    userId:
    {
        type: String,
        required: true
    },
    type:
    {
        type: String,
        enum: ['User', 'Printer', 'Admin'],
        required: true
    },
    level:
    {
        type: String,
        required: false
    }

});

userAccessSchema.pre('save', async function(next) {
    try {
        const type = this.type;
        this.level = decideUserAccessLevel(type);
        next();
    } catch (error) {
        next(error);
    }
});

const decideUserAccessLevel = function(type){
    try {
        if (type === 'User'){
            return 20;
        }else if (type === 'Printer'){
            return 40;
        }
        else if (type === 'Admin'){
            return 99;
        }else{
            return 0
        }
    }catch(e){
        console.log(e)
    }

}

const UserAccess = mongoose.model('UserAccess', userAccessSchema);

module.exports = UserAccess;
