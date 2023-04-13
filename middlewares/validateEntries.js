import { response } from 'express';
import { validationResult } from 'express-validator';

export const validateEntries = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
}
