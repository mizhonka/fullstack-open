const { test, after, beforeEach, describe } =require('node:test')
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

describe('when initial blogs exist', ()=>{
    test('get correct amount of blogs', async() => {
        const response=await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs have id', async() => {
        const response=await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert('id' in blog)
            assert(!('_id' in blog))
        })
    })

    describe('adding blogs', ()=>{
        test('valid blog can be added', async() => {
            const newBlog={
                title: 'Will this be added?',
                author: 'Mr. Unknown',
                url: 'www.somewhere.co',
                likes: 4
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response=await api.get('/api/blogs')
            const titles=response.body.map(r => r.title)

            assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
            assert(titles.includes('Will this be added?'))
        })

        test('likes is set to 0 if null', async()=>{
            const newBlog={
                title: 'No Likes',
                author: 'Some One',
                url: 'qwerty.com'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response=await api.get('/api/blogs')
            const addedBlog=response.body.filter(r=>r.title==newBlog.title)

            assert.strictEqual(response.body.length, helper.initialBlogs.length+1)
            assert.strictEqual(addedBlog[0].likes, 0)
        })

        test('blog without title or url are not added', async()=>{
            const newBlog={
                author: 'Lazy One'
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const response=await api.get('/api/blogs')

            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })
    })
})

after(async () => {
	await mongoose.connection.close()
})


