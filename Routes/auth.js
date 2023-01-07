const { Router } = require('express');
const User = require('../Database/Schemas/User');
const nodeMailer = require('nodemailer');
const { hashPassword, comparePassword} = require('../utils/hashing');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const router = Router();
dotenv.config();


router.post('/login',async (request,response) => {
    
    //getting the email and password from the request
    const {email, password} = await request.body;
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
                expiresIn : '1d'
            }
        )
        return response.status(200).json({
            token,
            message: "success"
        });
    }
        
    else{
        console.log('Failed to Authenticate')
        return response.status(401).json({
            message: 'error'
        });
    }
});

router.post('/register', async (request,response) => {
    const {email} = await request.body;
    if(!email){
        return response.status(400).json({message: 'bad request'})
    }
    
    const userDB = await User.findOne({email});
    if(userDB){
        return response.status(400).json({message: 'User already exist!'});
    }
    else {
        const password = hashPassword(request.body.password);
        await User.create({password, email});
        return response.status(201).json({
            message: 'success'
        });
    }
});

router.post('/forgotPassword',async (request,response) => {
    const {email} = await request.body;
    const userDB = await User.findOne({email});
    if(!email){
        return response.status(400).json({
            message: 'Bad Request'
        });
    }
    if(userDB){
        //6-digit number generate
        const code = Math.floor(100000 + Math.random() * 900000);

        //determining expire date
        
        const expireDate = new Date();
        expireDate.setMinutes(expireDate.getMinutes()+5);
        //forgotPassword object
        const forgotPassword = {
            code,
            expireDate
        };

        //updating the data in the data base
        User.findOneAndUpdate({email:email},{forgotPassword: forgotPassword},{new: true},(err,data) => {
            if(err) console.log(err);
            else console.log(data);
        });

        //sending email to the related user
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emirkaan184@gmail.com',
                pass: process.env.HOST_MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'emirkaan184@gmail.com',
            to: 'merakserhat@gmail.com',
            subjects: 'Password Reset',
            text: 'Your verification code is ' + code
        }

        transporter.sendMail(mailOptions, (error,info) => {
            if(error){
                console.log(error);
            }
            else{
                console.log('Email sent: ' + info.response);
            }
        })
            
        
        
        return response.status(200).json(
           {
            msg: "success"
           }
        );
    }
    else 
        response.status(404).send({msg: 'User does not exist!'});
});


router.post('/checkForgetPasswordCode', async (req,res) => {
    
    const {email,code} = await req.body;
    
    //checking whtether request is valid
    if(!email || !code){
        return res.status(400).send({
            message: 'bad request'
        });
        
    }
    //finding the user
    const userDB = await User.findOne({email: email});
    if(!userDB){
        return res.status(404).send({message: 'user does not exist'});
        
    }
    const codeDB = (userDB.forgotPassword) ? userDB.forgotPassword.code : undefined;
    if(!codeDB){
        return res.status(404).json({message: 'no validation code'});
        
    }
    const expireDate = userDB.forgotPassword.expireDate;
    if(code === codeDB && new Date().getDate() <= expireDate.getDate())
    {
        const resetToken = jwt.sign(
            {
                id: userDB._id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '15m'
            }
        );
        await User.findOneAndUpdate(
            {
                email
            },
            {
                resetToken
            }
        )
        return res.status(200).json({message: 'success',resetToken});
        
    }
    else{
        return res.status(401).json({
            message: 'code is wrong'
        })
       
    }

});





module.exports = router;