const { test, expect, beforeEach, describe } = require('@playwright/test')
const { name, timeout } = require('../playwright.config')
const {loginWith, createBlog} = require('./helper')

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
    await request.post('/api/users', {
        data: {
          name: 'Jimi Albert',
          username: 'mrhonka',
          password: 'mystery'
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
        await loginWith(page, 'mizhonka', 'secret')

        await expect(page.getByText('Miranda Honkanen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mizhonka', 'wrong')

        const errorDiv=await page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'mizhonka', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'My Blog', 'Einstein', '.co')

        const successDiv=await page.locator('.success')
        await expect(successDiv).toContainText('My Blog by Einstein added')
        await expect(page.getByText('My Blog Einstein')).toBeVisible()
    })

    describe('When initial blogs exist', ()=>{
        beforeEach(async ({ page }) => {
            await createBlog(page, 'My Blog', 'Einstein', '.co')
        })

        test('blog can be liked', async ({page})=>{
            await page.getByRole('button', {name: 'view'}).click()
            await page.getByRole('button', {name: 'like'}).click()
            await page.getByRole('button', {name: 'view'}).click()
            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('own blog can be deleted', async({page})=>{
            await page.getByRole('button', {name: 'view'}).click()
            await expect(page.getByText('My Blog by Einstein added')).toBeHidden()
            page.on('dialog', async dialog=>{
                expect(dialog.message()).toEqual('Remove My Blog by Einstein?')
                await dialog.accept()
            })
            await page.getByRole('button', {name: 'delete'}).click()

            const successDiv=await page.locator('.success')
            await expect(successDiv).toContainText('deleted successfully')
            await expect(page.getByText('My Blog Einstein')).toBeHidden()
        })

        test('delete button only visible on own blogs', async({page})=>{
            await page.getByRole('button', {name: 'logout'}).click()
            loginWith(page, 'mrhonka', 'mystery')
            await page.getByRole('button', {name: 'view'}).click()
            await expect(page.getByRole('button', {name: 'delete'})).toBeHidden()
        })
    })
  })
})
