const { Router } = require('express');
const User = require('../Database/Schemas/User');
const { hashPassword, comparePassword} = require('../utils/hashing');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const router = Router();
dotenv.config();

router.post('/login',async (request,response) => {
    //getting the email and password from the request
    const {email, password} = request.body;
    if(!email || !password) return response.status(400);

    //getting the related user in the database
    const userDB = await User.findOne({email});
    if(!userDB) return response.status(401);

    //comparing whether the password is true
    const isValid = comparePassword(password,userDB.password);
    if(isValid){
        console.log('Authenticated Successfully!')
        const token = jwt.sign(
            {
                user_id: userDB._id, 
                email: userDB.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn : 1000 * 60 * 60 * 24 * 30 * 12
            }
        )
        return response.status(200).json({
            token,
            message: "success"
        });
    }
        
    else{
        console.log('Failed to Authenticate')
        response.status(401);
    }
});

router.post('/register', async (request,response) => {
    const {email} = request.body;
    const userDB = await User.findOne({email});
    if(userDB){
        response.status(400).send({msg: 'User already exist!'});
    }
    else {
        const password = hashPassword(request.body.password);
        await User.create({password, email});
        response.status(201);
    }
});

module.exports = router;