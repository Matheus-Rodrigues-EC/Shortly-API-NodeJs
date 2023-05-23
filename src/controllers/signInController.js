import bcrypt from 'bcrypt';
import { db } from "../db.js";
import { v4 as uuid } from "uuid";

export async function signIn(req, res){
    const { email, password } = req.body;

    try{
        const search = 'SELECT * FROM "Users" WHERE email = $1';
        const user = await db.query(search, [email]);

        if((user.rowCount !== 0) && (bcrypt.compareSync(password, user.rows[0].password))){
            const token = uuid();

            const insertSession =  `INSERT INTO "Sessions" (user_id, token, createdAt)
                                    VALUES ($1, $2, now())`;
            await db.query(insertSession, [user.rows[0].id, token]);
            return res.status(200).send({token});
        }else{
            return res.status(401).send("Usuário e/ou senha incorretos");
        }
    }catch(error){
        return res.status(500).send(error);
    }

}