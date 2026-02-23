import { test, expect } from '@playwright/test'
import { attachPageErrors, login } from './helpers'

test('objects table loads and shows data', async ({ page }) => {
  attachPageErrors(page)
  await login(page, 'admin@example.com', 'admin123')
  await page.getByRole('link', { name: 'Объекты' }).click()
  await expect(page).toHaveURL(/\/objects/)
  await expect(page.getByRole('heading', { name: 'Объекты' })).toBeVisible()
  await expect(page.getByText('Объект 1').first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Создать' })).toBeEnabled()
  await expect(page.getByPlaceholder('Поиск по названию')).toBeVisible()
  await expect(page.locator('.table-filters')).toHaveCount(0)
})
