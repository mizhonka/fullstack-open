const mongoose=require('mongoose')

const blogSchema = mongoose.Schema({
	title: {
        type: String,
        required: true
    },
	author: String,
	url: {
        type: String,
        required: true
    },
	likes: Number
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
        if(!returnedObject.likes){returnedObject.likes=0}
		returnedObject.id=returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)
