const { test, after, beforeEach } =require('node:test')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app = require('../app')
const Blog =require('../models/blog')
const helper=require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('get correct amount of blogs', async() => {
	const response=await api.get('/api/blogs')

	assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
	mongoose.connection.close()
})
