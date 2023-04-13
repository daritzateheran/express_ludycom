import { conn } from "../db/db.js";
import { createJWT } from "../utils/jwt.js";
import bcrypt from "bcryptjs";


export const validateLogin = async (req, res = response) => {
    try {
        let { email, password } = req.body;
        let query = await conn.query('SELECT * FROM users WHERE email = ?',
            email);
        console.log(query)
        if (query[0].length===0) {
            return res.status(400).json({
                msg: 'User or password are incorrect'
            });
        }
        let user = query[0][0]

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                msg: 'User or password are incorrect'
            });
        }

        const token = await createJWT(user.id, user.name);

        res.json({
            userid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Something were wrong'
        });
    }

}