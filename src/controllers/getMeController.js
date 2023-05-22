import { db } from "../db.js";

export async function getMe(req, res){
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).send("Token não identificado");
    const token = auth.replace('Baerer ', '');

    let validate;
    try{
        const querySession =   `SELECT "Sessions".*, "Users".name FROM "Sessions" 
                                JOIN "Users" ON "Sessions".user_id = "Users".id
                                WHERE token = $1`;
        validate = await db.query(querySession, [token]);
        if(validate.rowCount === 0) return res.status(401).send("Sessão encerrada");
    }catch(error){
        return res.status(500).send(error)
    }

    try{
        const searchMe =   `SELECT "Users".id, "Users".name
                            FROM "Users"
                            JOIN "Sessions" ON "Users".id = "Sessions".user_id
                            WHERE "Sessions".token = $1
                            GROUP BY "Users".id`
        const me = await db.query(searchMe, [token]);

        const searchSum =   `SELECT SUM("Shorted_Links"."visitCount") as "visitCount"
                            FROM "Shorted_Links"
                            JOIN "Sessions" ON "Shorted_Links".user_id = "Sessions".user_id
                            WHERE "Sessions".token = $1`;
        const sum = await db.query(searchSum, [token])

        const queryLinks = `SELECT "Shorted_Links".id, "Shorted_Links"."shortUrl", "Shorted_Links".url, "Shorted_Links"."visitCount" FROM "Shorted_Links"
                            JOIN "Sessions" ON "Shorted_Links".user_id = "Sessions".user_id
                            WHERE "Sessions".token = $1`
        const links = await db.query(queryLinks, [token]);
        
        const dataMe = {
            id: me.rows[0].id,
            name: validate.rows[0].name,
            visitCount: sum.rows[0].visitCount,
            shortenedUrls: links.rows
        }
        return res.status(200).send(dataMe);
    }catch(error){
        return res.status(500).send(error);
    }


}