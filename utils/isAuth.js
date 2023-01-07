const express = require('express')
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../Database/Schemas/User');

module.exports =

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction}
     */

    async (req, res, next) => {
        //find JWT in Headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Acces Denied');
        }
        else {
            const bearerToken = token.split(' ')[1];
            jwt.verify(bearerToken, process.env.SECRET_KEY);
            const tokenDecode = jwt.decode(bearerToken);
            const user = await User.findById(new mongoose.Types.ObjectId(tokenDecode.user_id));
            req.user = user;
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                });
            }
            next();
        }
    }

