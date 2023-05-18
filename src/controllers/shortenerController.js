import { db } from "../db.js";
import { nanoid } from "nanoid";

export async function shortener(req, res){
    const token = req.headers.authorization;
    const auth = token.replace('Baerer ', '');
    const {url} = req.body;

    try{
        const searchId = 'SELECT user_id FROM "Sessions" WHERE token = $1;';
        const user_id = await db.query(searchId, [auth]);
        const id = user_id.rows[0].user_id;

        const shortened = nanoid(7);
        const insert = `INSERT INTO "Shorted_Links" (user_id, link, "shortUrl", created_at)
                        VALUES ($1, $2, $3, now());`;
        await db.query(insert, [id, url, shortened]);
        const updateLinksCount =   `UPDATE "Users" SET "linksCount" = "linksCount" + 1 
                                    WHERE id = $1;`;
        await db.query(updateLinksCount, [id])

        const searchData = `SELECT * FROM "Shorted_Links" WHERE "shortUrl" = $1`;
        const data = await db.query(searchData, [shortened]);

        return res.status(201).send({id: data.rows[0].id, shortUrl: data.rows[0].shortUrl})
    }catch(error){
        return res.status(500).send(error);
    }


}