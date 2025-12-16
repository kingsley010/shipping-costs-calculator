import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Import user model
import User from '../models/userModel.js';

class UserController {

    /**
     * @method homePage
     * @description home page
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    async homePage(req, res) {
        res.status(200).send("Home Page!");
    }


    /**
     * @method userPage
     * @description user page
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
     async userPage(req, res) {
        res.status(200).send("user Page!");
    }


    /**
     * @method registerUser
     * @description register a user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    async register(req, res) {
        
        const {username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log('pls fill in all fields');
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        
        try {

            // Check if username already exists in the database
            const user_name = await User.findOne({ username });
            if (user_name) {
                return res.status(400).json({ message: 'Username already in use. Please use another username' });
            }

            // Check if email already exists in the database
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'Email already in use. Please use another email' });
            }
            
            // Generate salt 
            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');
        
            // Generate hash for password
            const hash = await bcrypt.hash(password, salt);
            if (!hash) throw Error('Something went wrong hashing the password');
        
            // instantiate the User
            const newUser = new User({
              username,  
              email,
              password: hash
            });
        
            const savedUser = await newUser.save();
            if (!savedUser) throw Error('Something went wrong saving the user');
        
            // Generate token
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
              expiresIn: 3600
            });
        
            res.status(200).json({
              token,
              user: {
                id: savedUser.id,
                username: savedUser.username,
                email: savedUser.email,
                message: 'user registered'
              }
            });
        } catch (e) {
            res.status(400).json({ error: e.message });
          }

    }


    /**
     * @method loginUser
     * @description log in a user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    async login(req, res) {
        const { username, password } = req.body;

        // Check if username or password is empty
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please fill in all fields' });
        }

        try {
            // Check for existing user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            // Check if password in the database matches the password the user is inputting
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw Error('username or password is incorrect');

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: 3600});
            if (!token) throw Error('Could not sign token');

            res.status(200).json({
                //token,
                user: {
                    id: user._id,
                    username: user.username,
                    message: 'user signed in',
                    accessToken: token
                }
            })
        } catch (e) {
            res.status(400).json({ msg: e.message });
        }
    }

}

export default UserController;
