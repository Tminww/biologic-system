import { test, expect } from '@playwright/test'
import { attachPageErrors, login } from './helpers'

test('admin can open navigation pages', async ({ page }) => {
  attachPageErrors(page)
  await login(page, 'admin@example.com', 'admin123')

  const navItems = [
    { label: 'Панель управления', url: '/dashboard', heading: 'Панель управления' },
    { label: 'Направления', url: '/directions', heading: 'Направления' },
    { label: 'Образцы', url: '/samples', heading: 'Образцы' },
    { label: 'Протоколы', url: '/protocols', heading: 'Протоколы' },
    { label: 'Результаты', url: '/results', heading: 'Результаты' },
    { label: 'Заключения', url: '/conclusions', heading: 'Заключения' },
    { label: 'Специалисты', url: '/doctors', heading: 'Специалисты' },
    { label: 'Подразделения', url: '/departments', heading: 'Подразделения' },
    { label: 'Пользователи', url: '/admin/users', heading: 'Пользователи' },
    { label: 'Цели исследования', url: '/research-goals', heading: 'Цели исследования' },
    { label: 'Типы образцов', url: '/sample-types', heading: 'Типы образцов' },
    { label: 'Показатели', url: '/indicators', heading: 'Показатели' },
    { label: 'Типы протоколов', url: '/protocol-types', heading: 'Типы протоколов' },
    { label: 'Объекты', url: '/objects', heading: 'Объекты' }
  ]

  for (const item of navItems) {
    await page.getByRole('link', { name: item.label }).click()
    await expect(page).toHaveURL(new RegExp(`${item.url.replace(/\//g, '\\/')}$`))
    await expect(page.getByRole('heading', { name: item.heading })).toBeVisible()
  }
})
