// tests/rss.spec.js
import { test, expect } from '@playwright/test';
import { exec } from 'child_process';

let server;

test.beforeAll(async () => {
  // Inicia el servidor de desarrollo antes de los tests
  console.log('🚀 Iniciando servidor local...');
  server = exec('npx webpack serve --port 8080');

  // Espera unos segundos para que el servidor esté listo
  await new Promise(resolve => setTimeout(resolve, 5000));
});

test.afterAll(() => {
  // Cierra el servidor al finalizar las pruebas
  console.log('🧹 Cerrando servidor...');
  server.kill();
});

test('La aplicación carga correctamente', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page).toHaveTitle(/RSS/i); // Verifica que el título contiene "RSS"
});
