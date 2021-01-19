import type { Crop } from 'react-image-crop';

import type { Results } from '../types';

const MIME_TYPE_MAP = {
	jpg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp'
};

type DownloadImageOptions = {
	crop: Crop;
	fileName: string;
	format: string;
	image: HTMLImageElement;
	maxWidth: number;
	optimize?: boolean;
	quality?: number;
};

/**
 * Draw an HTMLImageElement to a canvas, then download the created drawing.
 */
export async function downloadImage({
	crop,
	fileName,
	format,
	image,
	maxWidth,
	optimize = false,
	quality = 0.85
}: DownloadImageOptions): Promise<Results> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	// Determine the scale, since the HTMLImageElement may have been scaled down
	// if it was larger than the resizer area container.
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	// Get the x-y coordinates. If no crop is available, then we'll be using the
	// entire canvas.
	const cropX = (crop.x / 100) * image.width ?? 0;
	const cropY = (crop.y / 100) * image.height ?? 0;

	// Get the crop width and height. If no crop is available, we'll be using the
	// entire canvas.
	const cropWidth = (crop.width / 100) * image.width ?? image.width;
	const cropHeight = (crop.height / 100) * image.height ?? image.height;

	// If the maximum image width is larger than the area that was selected, then
	// we need to resize the image down.
	const shouldScale = maxWidth && maxWidth !== cropWidth * scaleX;

	// If we need to scale down, use the maximum width as our width. Otherwise
	// calculate the selected width.
	const width = shouldScale ? maxWidth : Math.round(cropWidth * scaleX);

	// If we need to scale down, calculate the height based on the selected area
	// and the maximum width.
	const height = shouldScale ? Math.round((width / cropWidth) * cropHeight) : Math.round(cropHeight * scaleY);

	canvas.width = width;
	canvas.height = height;

	// @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

	const sx = Math.round(cropX * scaleX);
	const sy = Math.round(cropY * scaleY);
	const sWidth = Math.round(cropWidth * scaleX);
	const sHeight = Math.round(cropHeight * scaleY);

	ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, width, height);

	const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
	const newFileName = `${fileNameWithoutExtension}.${format}`;

	let blob = await toBlob(canvas, MIME_TYPE_MAP[format], quality);

	if (optimize) {
		const blobArrayBuffer = await blob.arrayBuffer();
		const res = await optimizeImage(new Uint8Array(blobArrayBuffer), blob.type);

		blob = new Blob([res.data], { type: blob.type });
	}

	const href = URL.createObjectURL(blob);

	downloadHref(newFileName, href);

	// Return the output height, width and size for the results table.
	return {
		height,
		size: blob.size,
		width
	};
}

/**
 * Convert the toBlob function to use a promise instead of a callback for async
 * and await usage.
 * @param canvas The canvas element to get a blob from.
 * @param type The mime type of the image format to retrieve.
 * @param quality A quality number from 0 - 1.
 */
function toBlob(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob === null) {
					reject(`Blob cannot be null`);

					return;
				}

				resolve(blob);
			},
			type,
			quality
		);
	});
}

/**
 * Download a blob by creating and clicking on a fake link.
 * @param filename Name of the file to be downloaded.
 * @param href A link to the file to download.
 */
function downloadHref(filename: string, href: string) {
	const a = document.createElement('a');

	a.download = filename;
	a.href = href;

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

async function optimizeImage(data: Uint8Array, type: string): Promise<{ data: Uint8Array }> {
	if (type === 'image/png') {
		const optipng = await import(/* webpackChunkName: "optipng-js" */ 'optipng-js');

		return optipng.default(data, ['-o2']);
	} else if (type === 'image/jpeg') {
		const { encode } = await import(/* webpackChunkName: "mozjpeg-js" */ 'mozjpeg-js');

		return encode(data);
	}

	return { data };
}
