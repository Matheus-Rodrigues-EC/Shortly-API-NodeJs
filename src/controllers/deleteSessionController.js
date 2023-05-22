import { db } from "../db.js";

export async function deleteSession(req, res){
    const auth = req.headers.authorization
    if(!auth) return res.sendStatus(401);
    const token = auth.replace('Baerer ', '');
    
    let sessionId;
    try{
        const sessionQuery = 'SELECT * FROM  "Sessions" WHERE token = $1';
        sessionId = await db.query(sessionQuery, [token]);
    }catch(error){
        return res.status(500).send(error);
    }

    try{
        const queryDelete = `DELETE FROM "Sessions" WHERE id = $1`;
        await db.query(queryDelete, [sessionId.rows[0].id]);
        return res.sendStatus(204)
    }catch(error){
        return res.status(500).send(error);
    }

}