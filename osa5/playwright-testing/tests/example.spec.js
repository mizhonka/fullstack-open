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
    await expect(page.getByText('login to application:')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByRole('button', {name: 'login'}).click()
        await page.getByTestId('username-input').fill('mizhonka')
        await page.getByTestId('password-input').fill('secret')
        await page.getByRole('button', {name: 'login'}).click()

        await expect(page.getByText('Miranda Honkanen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByRole('button', {name: 'login'}).click()
        await page.getByTestId('username-input').fill('mizhonka')
        await page.getByTestId('password-input').fill('wrong')
        await page.getByRole('button', {name: 'login'}).click()

        const errorDiv=await page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
    })
  })
})
