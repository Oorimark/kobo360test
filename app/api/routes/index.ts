import express, { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose, { Mongoose } from 'mongoose'
import { characterMiddelWare } from '../middlewares/character.ware'
import { movieMiddelWare } from '../middlewares/movie.ware'
import { CharacterCaretaker, CharacterOriginator } from '../../lib/Character'
import { Character } from '../../model/db'
import { generateToken } from '../../services/token.service'
import { MovieCaretaker, MovieOriginator } from '../../lib/Movie'

export const routes: Router = express.Router()

routes.use(bodyParser.json())
routes.use(express.json())
//routes.use(characterMiddelWare)

// validate all data received

const CharacterOrigin: CharacterOriginator = new CharacterOriginator();
const MovieOrigin: MovieOriginator = new MovieOriginator();

// character route
routes.route("/character")
   .post(characterMiddelWare, async (req: Request,res: Response) => { // adding
      req.body._id = new mongoose.Types.ObjectId()

      CharacterOrigin.createRecord(req.body)
      res.status(200).send({message: "success"}) 
   })

   .delete((req: Request, res: Response) => { // deleting
      CharacterOrigin.deleteRecord(req.body)
      res.status(200).send({message: "success"})
   })

   .put((req: Request, res: Response) => { // editing
      CharacterOrigin.updateRecord(req.body)
      res.status(200).send({message: "success"})
   })

   .get((req: Request, res: Response) => { // fetching
      CharacterOrigin.fetchAllRecords()
      const resp = CharacterOrigin.getResponse(CharacterCaretaker.fetchCollection())
 
      resp.then((result: any) => {
         if(result == null){
            res.status(404).send("The Record is Empty!")
         }
         else{ res.status(200).send(result) }
         
      }).catch((err: Error) => { console.error(err) })

   });


// sub character route: it handles searching for character
routes.get("/character/:first_name", (req: Request, res: Response) => {
   // you can search character by first_name only
   CharacterOrigin.fetchCharacter(req.params)
   const resp = CharacterOrigin.getResponse(CharacterCaretaker.fetchCharacter(req.params))

   resp
   .then((result) => {
      if(result == null){
         res.status(404).send({message: "The character is not in our database please POST the character."})
      }
      else{ res.status(200).send(result) }
   })
   .catch((err: Error) => { res.send(err) })

})


// movie route
 routes.route("/movies")
   .post(movieMiddelWare, (req: Request,res: Response) => { // adding
      req.body._id = new mongoose.Types.ObjectId()

      MovieOrigin.createRecord(req.body)
      res.status(200).send({message: "success"}) 
   })
   .delete((req: Request, res: Response) => { // deleting
      MovieOrigin.deleteRecord(req.body)
      res.status(200).send({message: "success"}) 
   })
   .put((req: Request, res: Response) => { // editing
      MovieOrigin.updateRecord(req.body)
      res.status(200).send({message: "success"}) 
   })
   .get((req: Request, res: Response) => { // fetching
      MovieOrigin.fetchAllRecords()
      const resp = MovieOrigin.getResponse(MovieCaretaker.fetchCollection())
 
      resp.then((result: any) => {
         if(result == null){
            res.status(404).send("The Record is Empty!")
         }
         else{ res.status(200).send(result) }
         
      }).catch((err: Error) => { console.error(err) })
   })

// sub movie route
routes.get("/movies/:movie_name/", (req: Request, res: Response) => {
   res.send(req.params.movie_name)
   // switch(req.params){
   //    case "character":
   //       break;
   // }
})


// === RECOMMENDATIONS === 
// The response should be checked before rendering message as "success"
