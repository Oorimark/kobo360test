import { Movies } from "../../model/db"
import { RESPONSE } from "../../model/enum"
import { Records, CharacterMemento } from "../Character"
import { FreezeClass } from "../Decorators"

@FreezeClass
export class MovieOriginator extends Records{

    createRecord(Movie: object): MovieCaretaker{
        return new MovieMemento(Movie).addMovie()
    }

    updateRecord(Movie: object): MovieCaretaker{
        return new MovieMemento(Movie).updateMovie()
    }
    deleteRecord(Movie: object): MovieCaretaker{
        return new MovieMemento(Movie).deleteMovie()
    }

    fetchAllRecords(): MovieCaretaker{
        return new MovieMemento().fetchMovie()
    }

    getResponse(res: Promise<MovieCaretaker>){
        return res
    }
}

@FreezeClass
export class MovieMemento{
    private _Movie: object | undefined

    constructor(Movie?: object){
        this._Movie = Movie
    }

    addMovie(): MovieCaretaker{
        return MovieCaretaker.addDocument(this._Movie)
    }

    updateMovie(): MovieCaretaker{
        return MovieCaretaker.updateDocument(this._Movie)
    }

    deleteMovie(): MovieCaretaker{
        return MovieCaretaker.deleteDocument(this._Movie) 
    }

    fetchMovie(): MovieCaretaker {
        return MovieCaretaker.fetchCollection()
    }

    // Helper methods
    checkCharacterInMovies(_Movie: object | undefined){
        /* if a character in movies is not in the character
         collection, the character is not known */

         // interact with the characterMemento to find out
         if(typeof(_Movie) == undefined){
            
         }
    }

    // end

    // == Methods that interact with other Memento == /
        // getMovieId(movieTitle: string){

        // }

        // static getCharacterId(character_name: object){
        //     // call the CharacterMemto
        //     return new CharacterMemento().getCharacterId(character_name)
        // }
}

@FreezeClass
export class MovieCaretaker{
    private static Response: any;
    
    public static async addDocument(arg: any){
        if(typeof(arg) != undefined){

            const add_Movie = new Movies(arg)

            add_Movie.save()
            .then(() => { this.Response = RESPONSE.Success; return RESPONSE.Success })
            .catch((err) => { return err })
        }
    }

    public static async deleteDocument(arg: object | undefined){
        if(typeof(arg) != undefined){
            const del_character = await Movies.deleteMany(arg)
        }
    }

    public static async updateDocument(arg: any){
        if(typeof(arg) != undefined){
            const update_char = await Movies.updateMany({first_name: arg.character}, { $set: arg.update })
        }
    }

    public static async fetchCollection(){
        const fetch_collections = await Movies.find()
        return fetch_collections
    }

    public static response(){
        return this.Response
    }
}