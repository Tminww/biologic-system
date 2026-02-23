import { test, expect } from '@playwright/test'
import { attachPageErrors, login } from './helpers'

test('doctor permissions restrict users page', async ({ page }) => {
  attachPageErrors(page)
  await login(page, 'doctor@example.com', 'doctor123')
  const usersNav = page.locator('.nav-item', { hasText: 'Пользователи' })
  await expect(usersNav).toHaveClass(/disabled/)
  await page.goto('/admin/users')
  await expect(page).toHaveURL(/\/dashboard/)
})

test('doctor cannot access objects page', async ({ page }) => {
  attachPageErrors(page)
  await login(page, 'doctor@example.com', 'doctor123')
  const objectsNav = page.locator('.nav-item', { hasText: 'Объекты' })
  await expect(objectsNav).toHaveClass(/disabled/)
  await page.goto('/objects')
  await expect(page).toHaveURL(/\/dashboard/)
})
