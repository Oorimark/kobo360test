import { Schema } from "mongoose"

export interface ICharacter{
    _id: Schema.Types.ObjectId,
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    phone: number,
    address: string,
    bio: string,
    age: number,
    movies: Array<object> | Array<string> // [Array<string>: for client input]
}

export interface IMovie{
    _id: Schema.Types.ObjectId,
    title: string,
    date_of_creation: Schema.Types.Date,
    characters: Array<object> | Array<string>

}

export interface ICaretaker{

}