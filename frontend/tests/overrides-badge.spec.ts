import { test, expect } from '@playwright/test'
import { attachPageErrors, login } from './helpers'

test('overrides badge appears in users table and permissions tab', async ({ page }) => {
  attachPageErrors(page)
  await login(page, 'admin@example.com', 'admin123')
  await page.getByRole('link', { name: 'Пользователи' }).click()
  await expect(page).toHaveURL(/\/admin\/users/)

  const row = page.locator('tr', { hasText: 'doctor@example.com' }).first()
  await expect(row).toBeVisible()
  await expect(row.locator('td').nth(2)).toContainText('2')

  await row.getByRole('button', { name: 'Действия' }).click()
  await expect(page.getByText('Просмотр пользователя', { exact: true })).toBeVisible()

  const permissionsTab = page.getByRole('tab', { name: /Права/ })
  await expect(permissionsTab).toContainText('2')
  await permissionsTab.click()

  const accordionBadges = page.locator('.permissions-accordion .p-overlaybadge')
  await expect(accordionBadges).toHaveCount(2)
})
