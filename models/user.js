import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema({
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timeStamps: true})

const User = models.User || mongoose.model('User', userSchema);
export default User;