const blogsRouter=require('express').Router()
const { response } = require('../app')
const Blog=require('../models/blog')


blogsRouter.get('/', async (request, response) => {
	const blogs=await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body)
    try{
        const savedBlog=await blog.save()
	    response.status(201).json(savedBlog)
    } catch(exception){
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response)=>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports=blogsRouter


