import { db } from "../db.js";

export async function openShortUrl(req, res){
    const {shortUrl} = req.params;

    try{
        const searchUrl = `SELECT * FROM "Shorted_Links" WHERE "shortUrl" = $1`;
        const link = await db.query(searchUrl, [shortUrl]);
        if(link.rowCount === 0){
            return res.status(404).send("Url não encontrada.");
        }else{
            const url = link.rows[0].url;
            return res.redirect(url);
        }
    }catch(error){
        return res.status(500).send(error);
    }

}