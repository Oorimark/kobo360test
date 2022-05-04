import { model, Mongoose, Schema } from "mongoose";
import { ICharacter, IMovie } from "../interfaces"

// character schema
const characterSchema = new Schema< ICharacter >({
    _id: Schema.Types.ObjectId,
    
    first_name: {
        type: String, required: true
    },

    last_name: {
        type: String, required: true
    },

    gender: {
        type: String, required: true
    },

    email: {
        type: String, required: true
    },

    phone: {
        type: Number, require: true
    },

    address: {
        type: String, require: true
    },

    bio: {
        type: String, max: 200, require: true
    },

    age: {
        type: Number, required: true
    },

    movies: {
        type: [{type: Schema.Types.ObjectId, ref: 'Movie'}], required: false
    }
});

export const Character = model<ICharacter>('Character', characterSchema)

// movie schema
const movieSchema = new Schema < IMovie > ({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date_of_creation: {
        type: Schema.Types.Date,
        required: true
    },
    characters: {
        type: [{type: Schema.Types.ObjectId, ref: 'Character'}],
        required: true
    }
}, {timestamps: true});


export const Movies = model<IMovie>('Movies', movieSchema)