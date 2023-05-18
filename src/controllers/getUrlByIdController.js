import { db } from "../db.js";

export async function getUrlById(req, res){
    const {id} = req.params;

    try{
        const searchById = `SELECT id, "shortUrl", url FROM "Shorted_Links" WHERE id = $1`;
        const url = await db.query(searchById, [id]);
        if(url.rowCount === 0) return res.status(404).send("A url não existe");

        return res.status(200).send(url.rows[0]);
    }catch(error){
        return res.status(500).send(error);
    }


}