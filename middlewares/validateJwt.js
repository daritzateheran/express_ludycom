import { response } from 'express';
import { verify } from 'jsonwebtoken';

export const validateJwt = (req, res = response, next) => {

    const token = req.header('x-apikey');

    if (!token) {
        return res.status(401).json({
            msg: 'Token not exists'
        });
    }

    try {
        const { userId, name } = verify(
            token,
            process.env.apiKey
        );
        req.userId = userId;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            msg: 'Not valid token'
        });
    }
    next();
}
