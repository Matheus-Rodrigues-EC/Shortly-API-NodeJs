import Joi from "joi";

const shortenerSchema = Joi.object({
    URL: Joi.string()
            .uri()
            .required()
});

export default shortenerSchema;