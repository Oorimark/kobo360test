import express, { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import { Validate } from "../../services/validate.service";

export function movieMiddelWare(req: Request, res: Response, next: NextFunction){
    // validate the input
    const { error } = Validate.validateMovieQuery(req.body)

    if(error){
        res.status(400).send(error)
    }
    else{ next() }
    
}