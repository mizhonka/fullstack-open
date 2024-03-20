const { test, expect, beforeEach, describe } = require('@playwright/test')
const { name } = require('../playwright.config')
const {loginWith} = require('./helper')

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
    await expect(page.getByText('login to application:')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        loginWith(page, 'mizhonka', 'secret')

        await expect(page.getByText('Miranda Honkanen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        loginWith(page, 'mizhonka', 'wrong')

        const errorDiv=await page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        loginWith(page, 'mizhonka', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', {name: 'new blog'}).click()
        await page.getByTestId('title-input').fill('My Blog')
        await page.getByTestId('author-input').fill('Albert Einstein')
        await page.getByTestId('url-input').fill('.co')
        await page.getByRole('button', {name: 'create'}).click()

        const successDiv=await page.locator('.success')
        await expect(successDiv).toContainText('My Blog by Albert Einstein added')
        await expect(page.getByText('My Blog Albert Einstein')).toBeVisible()
    })
  })
})
