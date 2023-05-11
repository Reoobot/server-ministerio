import { Schema } from "mongoose"

export const Images2Schemas = new Schema({
    name: String,
    img:{
        data:Buffer,
        contentType: 'image/png'
    }
})