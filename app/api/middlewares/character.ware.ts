import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import { Validate } from "../../services/validate.service";

export function characterMiddelWare(req: Request, res: Response, next: NextFunction){
    // validate the input
    const { error } = Validate.validateCharacterQuery(req.body)

    if(error){
        let msg: string = "The character data has either an empty field or the type is not correct"
        res.status(400).send(error)
    }
    else{ next() }
    
}