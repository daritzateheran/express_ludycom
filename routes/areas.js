import { Router } from "express";
import { check } from "express-validator";
import { validateEntries } from "../middlewares/validateEntries.js";
import { validateJwt } from "../middlewares/validateJWT.js";
import { createArea, deleteArea, getArea, getAreas, updateArea } from "../controllers/areas.js";

export const areaRouter = Router()

areaRouter.use( validateJwt );

areaRouter.post('/createArea',
    [
        check('code', 'Code is require').not().isEmpty(),
        check('code', 'Code must be numeric').isNumeric(),
        check('lider', 'Lider must be numeric').isNumeric(),
        check('lider', 'Lider is require').not().isEmpty(),
        validateEntries
    ],
    createArea
)

areaRouter.get('/getAreas',  check('page', 'Page is require').not().isEmpty(),
getAreas)

areaRouter.get('/getarea',  check('page', 'Page is require').not().isEmpty(),
getArea)


areaRouter.put('/:id', 
    [
        check('code', 'Code is require').not().isEmpty(),
        check('code', 'Code must be numeric').isNumeric(),
        check('lider', 'Lider must be numeric').isNumeric(),
        check('lider', 'Lider is require').not().isEmpty(),
        validateEntries
    ],
    updateArea 
);

areaRouter.delete('/:id', deleteArea );