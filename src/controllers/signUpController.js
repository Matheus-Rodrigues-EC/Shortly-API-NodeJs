import { db } from './../db.js';
import bcrypt from "bcrypt";

export async function signUp(req, res){
    const { name, email, password } = req.body;
    console.log(req.body);
    try{    
        const search = 'SELECT * FROM "Users" WHERE email = $1';
        const users = await db.query(search, [email]);
        if(users.rowCount !== 0) return res.status(409).send("Email já cadastrado.");
    }catch(error){
        return res.status(500).send(error);
    }

    const hashpass = bcrypt.hashSync(password, 5);

    try{
        const insert =  `INSERT INTO "Users" (name, email, password, "createdAt")
                        VALUES ($1, $2, $3, now());`;
        await db.query(insert, [name, email, hashpass]);
        return res.sendStatus(201);
    }catch(error){
        return res.status(500).send(error);
    }


}
