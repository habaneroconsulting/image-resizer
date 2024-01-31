import { test, expect } from '@playwright/test';

import { getFileHash } from './utilities/get-file-hash';

test.describe('image format outputs as', () => {
	test('AVIF image', async ({ page }) => {
		await page.goto('/image-resizer?format=avif');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630.avif');

		expect(getFileHash('tests/sample/1200x630.avif')).toEqual(getFileHash('test-downloads/1200x630.avif'));
	});

	test('JPEG image', async ({ page }) => {
		await page.goto('/image-resizer?format=jpeg');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630.jpeg');

		expect(getFileHash('tests/sample/1200x630.jpeg')).toEqual(getFileHash('test-downloads/1200x630.jpeg'));
	});

	test('PNG image', async ({ page }) => {
		await page.goto('/image-resizer?format=png');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630.png');

		expect(getFileHash('tests/sample/1200x630.png')).toEqual(getFileHash('test-downloads/1200x630.png'));
	});

	test('WebP image', async ({ page }) => {
		await page.goto('/image-resizer?format=webp');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630.webp');

		expect(getFileHash('tests/sample/1200x630.webp')).toEqual(getFileHash('test-downloads/1200x630.webp'));
	});

	test('optimized AVIF image', async ({ page }) => {
		await page.goto('/image-resizer?format=avif&optimize=true');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630-optimized.avif');

		expect(getFileHash('tests/sample/1200x630-optimized.avif')).toEqual(
			getFileHash('test-downloads/1200x630-optimized.avif')
		);
	});

	test('optimized JPEG image', async ({ page }) => {
		await page.goto('/image-resizer?format=jpeg&optimize=true');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630-optimized.jpeg');

		expect(getFileHash('tests/sample/1200x630-optimized.jpeg')).toEqual(
			getFileHash('test-downloads/1200x630-optimized.jpeg')
		);
	});

	test('optimized PNG image', async ({ page }) => {
		await page.goto('/image-resizer?format=png&optimize=true');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630-optimized.png');

		expect(getFileHash('tests/sample/1200x630-optimized.png')).toEqual(
			getFileHash('test-downloads/1200x630-optimized.png')
		);
	});

	test('optimized WebP image', async ({ page }) => {
		await page.goto('/image-resizer?format=webp&optimize=true');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1200x630-optimized.webp');

		expect(getFileHash('tests/sample/1200x630-optimized.webp')).toEqual(
			getFileHash('test-downloads/1200x630-optimized.webp')
		);
	});
});
