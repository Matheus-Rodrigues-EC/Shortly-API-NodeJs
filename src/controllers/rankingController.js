import { db } from "../db.js";

export async function ranking(req, res){

    try{
        const searchRank = `SELECT "Users".id, "Users".name, "Users"."linksCount", SUM("Shorted_Links"."visitCount") as "visitCount"
                            FROM "Users"
                            JOIN "Shorted_Links" ON "Shorted_Links".user_id = "Users".id
                            GROUP BY "Users".id
                            ORDER BY "visitCount" DESC
                            LIMIT 10`
        const ranking = await db.query(searchRank);
        return res.status(200).send(ranking.rows);
    }catch(error){
        return res.status(500).send(error);
    }


}