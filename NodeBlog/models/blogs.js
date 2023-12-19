const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    title : {
        type : String,
        trim : true,
        required : [true, "Title is required"]
    },
    snippet : {
        type : String,
        trim : true,
        required : [true, 'Snippet is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    author : {
        type : Schema.Types.ObjectId, 
        ref : 'author',
        required : [true, 'Author is required']
    },
    image : {
        type : [""],
        default : ""
    }
})
module.exports = model("blog", blogSchema)