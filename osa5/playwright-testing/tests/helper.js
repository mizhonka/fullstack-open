const loginWith=async (page, username, password)=>{
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

export {loginWith}
