import signInSchema from './../Schemas/signInSchema.js';

export async function signInValidate(req, res, next){

    const { email, password } = req.body;

    if(signInSchema.validate({Email: email, Password: password}).error !== undefined){
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Email" is not allowed to be empty'){
            return res.status(422).send("O campo EMAIL é obrigatório");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Email" must be a valid email'){
            return res.status(422).send("O campo EMAIL deve conter um email válido");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Password" is not allowed to be empty'){
            return res.status(422).send("O campo SENHA é obrigatório");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Password" must be a string'){
            return res.status(422).send("O campo SENHA deve ser uma string");
        }
        if(signInSchema.validate({Email: email, Password: password}).error.message === '"Email" must be a string'){
            return res.status(422).send("O campo Email deve ser uma string");
        }

        return res.status(422).send(signInSchema.validate({Email: email, Password: password}).error.message);
    }

    next();
}