import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Raphael Aciardi Fabrcio')
  await page.getByLabel('Seu e-mail').fill('raphael@example.com')
  await page.getByLabel('Seu número de celular').fill('(11) 99999-9999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText(
    'Restaurante cadastrado com sucesso',
  )
  expect(toast).toBeVisible()

  await page.waitForTimeout(5000)
})

test('sign up with wrong credentials', async ({ page }) => {

    await page.goto('/sign-up', { waitUntil: 'networkidle' })
  
    await page.getByLabel('Nome do estabelecimento').fill('Pizza Rocket')
    await page.getByLabel('Seu nome').fill('Raphael Aciardi da Silva')
    await page.getByLabel('Seu e-mail').fill('raphael123@example.coma')
    await page.getByLabel('Seu número de celular').fill('(11) 5599-99959')
  
    await page.getByRole('button', { name: 'Finalizar cadastro' }).click()
  
    const toast = page.getByText(
      'Erro ao cadastrar restaurante',
    )
    expect(toast).toBeVisible()
  
    //await page.waitForTimeout(5000)
  })


test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Fazer login' }).click()
  expect(page.url()).toContain('/sign-in')
})