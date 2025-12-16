import mongoClient from 'mongoose';

// Create Schema
const userSchema = mongoClient.Schema({
    username: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoClient.model('user', userSchema);

export default User;
