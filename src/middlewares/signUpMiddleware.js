import signUpSchema from "../Schemas/signUpSchema.js";

export default function signUpValidation(req, res, next){

    const { name, email, password, confirmPassword } = req.body;
    
    if(signUpSchema.validate({Name: name, Email: email, Password: password}).error !== undefined){

        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Name" is not allowed to be empty'){
            return res.status(422).send("O campo NOME é obrigatório.")
        }
        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Name" length must be at least 3 characters long'){
            return res.status(422).send("O campo NOME deve conter mais de 3 caracteres.")
        }
        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Email" is not allowed to be empty'){
            return res.status(422).send("O campo EMAIL é obrigatório.")
        }
        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Email" must be a valid email'){
            return res.status(422).send("O campo EMAIL deve conter um email válido.")
        }
        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Password" is not allowed to be empty'){
            return res.status(422).send("O campo SENHA é obrigatório.")
        }
        if(signUpSchema.validate({Name: name, Email: email, Password: password}).error.message === '"Password" length must be at least 3 characters long'){
            return res.status(422).send("O campo SENHA dever ter mais de 3 caractéres.")
        }

        return res.status(422).send(signUpSchema.validate(
            {Name: name, Email: email, Password: password}
            ).error.message)
    }
    
    if(password !== confirmPassword){
        return res.status(422).send("Campos de Senha e confirmação de senha são diferentes.")
    }

    next()

}