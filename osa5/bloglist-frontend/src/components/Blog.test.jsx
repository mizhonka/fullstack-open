import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { exact } from 'prop-types'

test('title is rendered', ()=>{
    const blog={
        user: {
            username: 'mizhonka'
        },
        title: 'Find This Title',
        author: 'Myself',
        url: '.org',
        likes: 0,
        isVisible: false
      }

    render(<Blog blog={blog} user={{username: 'mizhonka'}}/>)
    const element=screen.getByText('Find This Title', {exact: false})
})
