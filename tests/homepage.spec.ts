import { test, expect } from '@playwright/test';

test.describe('homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/image-resizer');
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle(/Habasizer/);
	});

	test('has wordmark', async ({ page }) => {
		await expect(page.getByText('Habasizer')).toBeVisible();
	});

	test('has documentation link', async ({ page }) => {
		await page.getByText('Documentation').click();

		await page.waitForURL('/image-resizer/documentation');

		await expect(page.getByText('This app resizes images')).toBeVisible();

		await page.getByText('Return to resizer').click();

		await expect(page.getByText('This app resizes images')).not.toBeVisible();
	});
});
