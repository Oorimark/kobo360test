import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { routes } from './api/routes'
import { db } from './config'
import dotenv from 'dotenv'

dotenv.config()
const app: Application = express()
const PORT: number = 7200

app.use(bodyParser.json())
app.use("/",routes)


db


// listening port
app.listen(PORT, () => { console.log(`The Application is running on PORT ${PORT}`) })


