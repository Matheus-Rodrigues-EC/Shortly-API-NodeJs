import shortenerSchema from "../Schemas/shortenerSchema.js";

export default function shortenerValidate(req, res, next){
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).send("Token não identificado");

    const {url} = req.body;

    if(shortenerSchema.validate({URL: url}).error !== undefined){
        const error = shortenerSchema.validate({URL: url}).error.message
        if(error === '"URL" is not allowed to be empty') return res.status(422).send("A URL não pode estar vazia.");
        if(error === '"URL" must be a valid uri') return res.status(422).send("A URL deve ser válida.");
        return res.status(422).send(error)
    }

    next();
}