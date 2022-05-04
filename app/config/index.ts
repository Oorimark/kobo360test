import mongoose, { Mongoose } from "mongoose";

const db_url = "mongodb://127.0.0.1:27017/koboTest?compressors=none"

export const db = mongoose.connect(db_url)
.then(() => {console.log("Mongo connected!")})
.catch((err:Error) => {console.error(err)}) 