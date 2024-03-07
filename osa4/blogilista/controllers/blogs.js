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

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body=request.body
	const blog={
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

module.exports=blogsRouter


