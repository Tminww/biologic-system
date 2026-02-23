import { test, expect } from '@playwright/test'
import { login } from './helpers'

test('login and logout flow', async ({ page }) => {
  await login(page, 'admin@example.com', 'admin123')
  await expect(page.getByRole('heading', { name: 'Панель управления' })).toBeVisible()
  const logoutButton = page.getByRole('button', { name: 'Выйти' })
  await expect(logoutButton).toBeVisible()
  await logoutButton.click({ force: true })
  await expect(page).toHaveURL(/\/login/)
})
