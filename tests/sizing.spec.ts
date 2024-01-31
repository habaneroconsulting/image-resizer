import { test, expect } from '@playwright/test';
import imageSize from 'image-size';

import { getFileHash } from './utilities/get-file-hash';

test.describe('image formats', () => {
	test('exports 720p image', async ({ page }) => {
		await page.goto('/image-resizer?id=hd720');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/hd720.jpeg');

		expect(getFileHash('tests/sample/hd720.jpeg')).toEqual(getFileHash('test-downloads/hd720.jpeg'));

		const dimensions = imageSize('test-downloads/hd720.jpeg');
		expect(dimensions.height).toBe(720);
		expect(dimensions.width).toBe(1280);
	});

	test('exports custom ratio image', async ({ page }) => {
		await page.goto('/image-resizer?ar-h=1&ar-w=1&max-w=1000');

		await page.setInputFiles('input[type="file"]', 'tests/sample/source.png');

		const downloadPromise = page.waitForEvent('download');
		await page.getByText('Download image').click();
		const download = await downloadPromise;
		await download.saveAs('test-downloads/1x1-1000w.jpeg');

		expect(getFileHash('tests/sample/1x1-1000w.jpeg')).toEqual(getFileHash('test-downloads/1x1-1000w.jpeg'));

		const dimensions = imageSize('test-downloads/1x1-1000w.jpeg');
		expect(dimensions.height).toBe(1000);
		expect(dimensions.width).toBe(1000);
	});
});
