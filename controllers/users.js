import { conn } from "../db/db.js";
import bcrypt from "bcryptjs";
import xl from "excel4node"


export const createUser = async (req, res) => {
    try {
        let { name, lastname, email, password, birthday, userid, areacode, salary, state } = req.body;

        let query = await conn.query('SELECT * FROM users WHERE email = ?',
            email);
        if (query[0].length > 0) {
            return res.status(400).json({
                msg: 'User already exists'
            });
        }

        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const [rows] = await conn.query(
            'INSERT INTO users ( name, lastname, email, password, birthday, userid, areacode, salary, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, lastname, email, password, birthday, userid, areacode, salary, state])

        return res.status(201).json({
            msg: 'created',
            userid: rows.insertId

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
}

export const getUsers = async (req, res) => {

    try {
        const { page } = req.body;
        console.log(page)
        const [rows] = await conn.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }
};

export const getUser = async (req, res) => {

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }

        const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [
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

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        let { name, lastname, email, password, birthday, userid, areacode, salary, state } = req.body;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }
        const [query] = await conn.query(
            "UPDATE users SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), email = IFNULL(?, email), password = IFNULL(?, password), birthday = IFNULL(?, birthday), userid = IFNULL(?, userid), areacode = IFNULL(?, areacode), salary = IFNULL(?, salary), state = IFNULL(?, state) WHERE id = ?",
            [name, lastname, email, password, birthday, userid, areacode, salary, state, id]
        );

        if (query.affectedRows === 0)
            return res.status(404).json({ message: "User not found" });

        const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [
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


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                msg: 'Id missing'
            });
        }
        const [rows] = await conn.query("DELETE FROM users WHERE id = ?", [id]);

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


export const exportUsers = async (req, res) => {
    const { page } = req.body;
    console.log(page)
    const [rows] = await conn.query("SELECT * FROM users");

    //Logica de internet, out of time :c
    try{
        console.log('start')
        var arr = JSON.parse(JSON.stringify(rows))

        var wb = new xl.Workbook()
        var ws = wb.addWorksheet('Users') 

        console.log(ws)

        for(const [cnt, item] of arr.entries()){

            delete item.password

            let keys = Object.keys(item)
            var values = Object.values(item)
            keys.forEach((col, ind)=>{
                ws.cell(1, ind+1).string(col)
                console.log(col)
                console.log(values[ind])
                ws.cell(cnt+2, ind+1).string(String(values[ind])||'null')
            })                
        }
        // wb.write('./static/excel/usersExcel.xlsx', function(err, stats){
        //     if(err){
        //         console.log(err)
        //         console.log('User Excel File Error')        
        //         res.send({status: 'error'})    
        //     }
        //     else {
        //         console.log('User Excel File Done')        
        //         res.download('./static/excel/userExcel.xlsx', err=>{
        //             if(err){
        //                 res.send({
        //                     status: 'error',
        //                     errMsg: err
        //                 })
        //             }
        //         })

        //     }

        // })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something were wrong'
        });
    }


};