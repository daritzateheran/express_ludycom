import { Router } from "express";
import { validateLogin } from "../controllers/login.js";
import { check } from "express-validator";

export const loginRouter = Router()

loginRouter.post('/',
    [
        check('email', 'Email is require').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 })
    ],
    validateLogin);