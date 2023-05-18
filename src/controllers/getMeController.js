import { db } from "../db.js";

export async function getMe(req, res){
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).send("Token não identificado");
    const token = auth.replace('Baerer ', '');

    try{
        const querySession = `SELECT * FROM "Sessions" WHERE token = $1`;
        const validate = await db.query(querySession, [token]);
        if(validate.rowCount === 0) return res.status(401).send("Sessão encerrada");
    }catch(error){
        return res.status(500).send(error)
    }

    try{
        const searchMe =   `SELECT "Users".id, "Users".name, SUM("Shorted_Links"."visitCount") as "visitCount"
                            FROM "Shorted_Links"
                            JOIN "Users" ON "Shorted_Links".user_id = "Users".id
                            JOIN "Sessions" ON "Users".id = "Sessions".user_id
                            WHERE "Sessions".token = $1
                            group by "Users".id`
        const me = await db.query(searchMe, [token]);

        const queryLinks = `SELECT "Shorted_Links".id, "Shorted_Links"."shortUrl", "Shorted_Links".url, "Shorted_Links"."visitCount" FROM "Shorted_Links"
                            JOIN "Sessions" ON "Shorted_Links".user_id = "Sessions".user_id
                            WHERE "Sessions".token = $1`
        const links = await db.query(queryLinks, [token]);
        
        const dataMe = {
            id: me.rows[0].id,
            name: me.rows[0].name,
            visitCount: me.rows[0].visitCount,
            shortenedUrls: links.rows
        }

        return res.status(200).send(dataMe);
    }catch(error){
        return res.status(500).send(error);
    }


}