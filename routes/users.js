import { Router } from "express";
import { check } from "express-validator";
import { createUser, deleteUser, exportUsers, getUser, getUsers, updateUser } from "../controllers/users.js";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJwt } from "../middlewares/validateJWT.js";

export const userRouter = Router()

userRouter.use( validateJwt );

userRouter.post('/createUser',
    [
        check('name', 'Name is require').not().isEmpty(),
        check('lastname', 'Lastname is require').not().isEmpty(),
        check('birthday', 'Must be a date').not().isEmpty(),
        check('userId', 'Identification number is require').isLength({ max: 7}),
        check('email', 'Email is require').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        check('areacode', 'Password must have less than 3 characters').isLength({ max: 2 }),
        check('salary', 'Password must have less than 3 characters').isNumeric(),
        validateEntries
    ],
    createUser
)

userRouter.get('/getUsers',  check('page', 'Page is require').not().isEmpty(),
getUsers)

userRouter.get('/getUser',  check('page', 'Page is require').not().isEmpty(),
getUser)


userRouter.put('/:id', 
    [
        check('name', 'Name is require').not().isEmpty(),
        check('lastname', 'Lastname is require').not().isEmpty(),
        check('birthday', 'Must be a date').not().isEmpty(),
        check('userId', 'Identification number is require').isLength({ max: 7}),
        check('email', 'Email is require').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
        check('areacode', 'Password must have less than 3 characters').isLength({ max: 2 }),
        check('salary', 'Password must have less than 3 characters').isNumeric(),
        validateEntries
    ],
    updateUser 
);

userRouter.delete('/:id', deleteUser );

userRouter.get("/downloadExcel", exportUsers);


