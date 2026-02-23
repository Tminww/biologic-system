import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export const attachPageErrors = (page: Page) => {
  page.on('pageerror', (error) => {
    console.error('pageerror', error.message, error.stack)
  })
  page.on('console', (message) => {
    const type = message.type()
    if (type === 'error') {
      console.error('console.error', message.text())
    }
  })
}

export const login = async (page: Page, email: string, password: string) => {
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Вход в систему' })).toBeVisible()
  await page.getByPlaceholder('Email').fill(email)
  await page.getByPlaceholder('Пароль').fill(password)
  await page.locator('form').evaluate((form) => (form as HTMLFormElement).requestSubmit())
  await expect(page).toHaveURL(/\/dashboard/)
}
