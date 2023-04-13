import { conn } from "../db/db.js";

export const createArea = async (req, res) => {
    try {
        let { code, name, lider, state } = req.body;

        let query = await conn.query('SELECT * FROM areas WHERE code = ?',
            code);
        if (query[0].length > 0) {
            return res.status(400).json({
                msg: 'Area already exists'
            });
        }

        const [rows] = await conn.query(
            'INSERT INTO areas ( code, name, lider, state) VALUES (?, ?, ?, ?)',
            [code, name, lider, state])

        return res.status(201).json({
            msg: 'created',
            areaid: rows.insertId

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
}

export const getAreas = async (req, res) => {

    try {
        const { page } = req.body;
        console.log(page)
        const [rows] = await conn.query("SELECT * FROM areas");
        res.json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
};


export const getArea = async (req, res) => {

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }

        const [rows] = await conn.query("SELECT * FROM areas WHERE id = ?", [
            id,
        ]);
        res.json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
};

export const updateArea = async (req, res) => {
    try {
        const id = req.params.id;
        let { code, name, lider, state } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }
        const [query] = await conn.query(
            "UPDATE areas SET code = IFNULL(?, code), name = IFNULL(?, name), lider = IFNULL(?, lider), state = IFNULL(?, state) WHERE id = ?",
            [code, name, lider, state, id]
        );

        if (query.affectedRows === 0)
            return res.status(404).json({ message: "Area not found" });

        const [rows] = await conn.query("SELECT * FROM areas WHERE id = ?", [
            id,
        ]);

        res.json(rows[0]);


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
};

export const deleteArea = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }
        const [rows] = await conn.query("DELETE FROM areas WHERE id = ?", [id]);

        if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "User not found" });
        }

    res.sendStatus(204);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
};