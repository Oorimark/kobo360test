import { Character, Movies } from "../../model/db"
import { RESPONSE } from "../../model/enum";
import { ICharacter } from "../../model/interfaces";
import { Caretakers } from "../../model/types";
import { FreezeClass } from "../Decorators";

// the abstract class Record should be moved to another script
export abstract class Records{
  abstract createRecord(character: object): Caretakers;
  abstract updateRecord(character: object): Caretakers;
  abstract deleteRecord(character: object): Caretakers;
  abstract fetchAllRecords(): Caretakers;
}

// ===> MEMENTO DESIGN PATTERN

@FreezeClass
export class CharacterOriginator extends Records{

    createRecord(character: object): CharacterCaretaker{
        return new CharacterMemento(character).addCharacter()
    }

    updateRecord(character: object): CharacterCaretaker{
        return new CharacterMemento(character).updateCharacter()
    }
    deleteRecord(character: object): CharacterCaretaker{
        return new CharacterMemento(character).deleteCharacter()
    }

    fetchAllRecords(): CharacterCaretaker{
        return new CharacterMemento().fetchCharacter()
    }

    fetchCharacter(first_name: object): CharacterCaretaker{
        return new CharacterMemento().findCharacter(first_name)
    }

    getResponse(res: Promise<CharacterCaretaker>){
        return res
    }
}

@FreezeClass
export class CharacterMemento{
    private _character

    constructor(character?: object){
        this._character = character
    }

    addCharacter(): CharacterCaretaker{
        return CharacterCaretaker.addDocumentByPopulate(this._character)
    }

    updateCharacter(): CharacterCaretaker{
        return CharacterCaretaker.updateDocument(this._character)
    }

    deleteCharacter(): CharacterCaretaker{
        return CharacterCaretaker.deleteDocument(this._character) 
    }

    fetchCharacter(): CharacterCaretaker {
        return CharacterCaretaker.fetchCollection()
    }

    findCharacter(first_name: object): CharacterCaretaker {
        return CharacterCaretaker.fetchCharacter(first_name)
    }

    // methods that interact with other Memento
    getCharacterId(first_name: object){
        return CharacterCaretaker.fetchCharacter(first_name)
    }
}

@FreezeClass
export class CharacterCaretaker{
    private static characterCaretakerResponse: any
    
    public static addDocument(arg: object | undefined): any{
        if(typeof(arg) != undefined){
            const add_character = new Character(arg)

           add_character.save()
           .then(() => { })
           .catch((err) => { return err })

        }

        // the return type is "any" because the Repsonse field can take any dataType
    }

    public static async deleteDocument(arg: object | undefined){
        if(typeof(arg) != undefined){
            const del_character = await Character.deleteMany(arg)
        }
    }

    public static async updateDocument(arg: any){
        if(typeof(arg) != undefined){
            const update_char = await Character.updateMany({first_name: arg.character}, { $set: arg.update })
        }
    }

    public static async fetchCollection(){
        const fetch_collections = await Character.find()
        return fetch_collections
    }

    public static async fetchCharacter(first_name: object): Promise<any>{
        return await Character.findOne((first_name))
    }

    public static response(){
        return this.characterCaretakerResponse
    }


    // == Trying Populate == //

    public static addDocumentByPopulate(arg: any): any{
            const character = new Character(arg)
            character.save()
            .then(() => {
                for(let movie of arg.movies){
                    const movie1 = new Movies({
                        title: movie,
                        character: arg._id
                    })
                    movie1.save()
                    .catch((err) => { console.error(err) })
                }
            }) 
            .catch((err: Error) => { console.error(err) })
        
       // else{ throw new Error("The movies field should be an Array of string") }
    }

    public static async fetchCharacterByMovie(title: string){
        const movie = await Movies.findOne({title: title}).
                      populate('characters')
        return movie
        // To access the full name
        // movie.character.first_name + movie.character.last_name
    }
}

// === RECOMMEDATION ===
// 1. A services should be created which will handle empty objects.
// 2. No Character should be saved in a movie if the the character isn't in the db.