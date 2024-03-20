const { test, expect, beforeEach, describe } = require('@playwright/test')
const { name } = require('../playwright.config')

describe('Bloglist app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Miranda Honkanen',
        username: 'mizhonka',
        password: 'secret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', {name: 'login'}).click()
    page.getByText('login to application:')
  })
})
