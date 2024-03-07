import { test, expect } from '@playwright/test';

test.describe('image controls', () => {
	test('enable and disable with image selection', async ({ page }) => {
		await page.goto('/image-resizer');

		await expect(page.getByText('Select one from your device')).toBeVisible();
		await expect(page.getByText('Replace image')).not.toBeVisible();

		await expect(page.getByRole('button', { name: 'Download image' })).toBeDisabled();

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		await expect(page.getByText('Select one from your device')).not.toBeVisible();
		await expect(page.getByRole('button', { name: 'Replace image' })).toBeVisible();

		await expect(page.getByRole('button', { name: 'Download image' })).toBeEnabled();

		await page.getByText('Deselect crop').click();
		await expect(page.getByRole('button', { name: 'Download image' })).toBeDisabled();

		await page.getByText('Replace image').click();
		await expect(page.getByRole('button', { name: 'Replace image' })).not.toBeVisible();
	});

	test('are set default values', async ({ page }) => {
		await page.goto('/image-resizer');

		await expect(page.locator('#aspect-ratio-units-wide')).toHaveValue('1200');
		await expect(page.locator('#aspect-ratio-units-high')).toHaveValue('630');
		await expect(page.locator('#aspect-ratio-lock')).toHaveClass(/is-checked/);
		await expect(page.getByText('JPEG (photography)', { exact: true })).toBeVisible();
		await expect(page.getByLabel('Export width')).toHaveValue('1200 px');
		await expect(page.locator('#optimize-image')).toHaveAttribute('aria-checked', 'false');
	});

	test('are set to preset values', async ({ page }) => {
		await page.goto('/image-resizer?id=facebook_cover_photo');

		await expect(page.locator('#aspect-ratio-units-wide')).toHaveValue('820');
		await expect(page.locator('#aspect-ratio-units-high')).toHaveValue('312');

		await expect(page.getByText('JPEG (photography)')).toBeVisible();
	});

	test('are set specific values', async ({ page }) => {
		await page.goto('/image-resizer?ar-h=456&ar-w=123&lock-aspect-ratio=true&max-w=890&format=avif&optimize=true');

		await expect(page.locator('#aspect-ratio-units-wide')).toHaveValue('123');
		await expect(page.locator('#aspect-ratio-units-high')).toHaveValue('456');
		await expect(page.locator('#aspect-ratio-lock')).toHaveClass(/is-checked/);
		await expect(page.getByText('AVIF', { exact: true })).toBeVisible();
		await expect(page.getByLabel('Export width')).toHaveValue('890 px');
		await expect(page.locator('#optimize-image')).toHaveAttribute('aria-checked', 'true');

		await page.goto('/image-resizer?optimize=false');

		await expect(page.locator('#optimize-image')).toHaveAttribute('aria-checked', 'false');
	});
});
