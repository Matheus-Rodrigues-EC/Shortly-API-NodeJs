import { db } from "../db.js";

export async function deleteById(req, res){
    const auth = req.headers.authorization
    if(!auth) return res.sendStatus(401);
    const {id} = req.params;
    try{
        const token = auth.replace('Baerer ', '');
        const searchSession = `SELECT * FROM "Shorted_Links" WHERE id = $1`;
        const searchId = await db.query(searchSession, [id]);
        if(searchId.rowCount === 0) return res.status(404).send("Url não encontrada");
        const search =  `SELECT "Shorted_Links".* FROM "Shorted_Links"
                                JOIN "Sessions" ON "Sessions".user_id = "Shorted_Links".user_id
                                WHERE "Shorted_Links".id = $1 AND "Sessions".token = $2`
        const validate = await db.query(search, [id, token]);
        if(validate.rowCount === 0) return res.sendStatus(401);
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        const queryDelete = `DELETE FROM "Shorted_Links" WHERE id = $1`;
        await db.query(queryDelete, [id]);
        return res.sendStatus(204)
    }catch(error){
        return res.status(500).send(error);
    }

}