import Joi from 'joi'
import { ICharacter, IMovie } from '../model/interfaces'

export class Validate{
    public static validateCharacterQuery(data: any){
        const schema = Joi.object < ICharacter > ({
            first_name: Joi.string().trim().required(),
            last_name:  Joi.string().trim().required(),
            gender:     Joi.string().trim().required(),
            email:      Joi.string().trim().required(),
            phone:      Joi.number().required(),
            address:    Joi.string().trim().required(),
            bio:        Joi.string().max(200).trim().required(),
            age:        Joi.number().required(),
            movies:     Joi.array()
        });

        return schema.validate(data)
    }
    
    public static validateMovieQuery(data: any){
        const schema = Joi.object < IMovie > ({
            title: Joi.string().required(),
            date_of_creation: Joi.date().required(),
            characters: Joi.array()
        });

        return schema.validate(data)
    }
}