const express = require('express')
const jwt = require('jsonwebtoken');


module.exports =

    /**
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction}
     */

    (req, res, next) => {
        //find JWT in Headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).send('Acces Denied');
        }
        else {
            const bearerToken = token.split(' ')[1];
            jwt.verify(bearerToken, process.env.SECRET_KEY);
            next();
        }
    }

