import type { Crop } from 'react-image-crop';

import type { Formats, Results } from '../types';
import { QUALITY_LEVELS } from '../../constants';

const MIME_TYPE_MAP = {
	avif: 'image/avif',
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp'
};

type DownloadImageOptions = {
	crop: Crop;
	fileName: string;
	format?: Formats;
	image: HTMLImageElement;
	maxWidth: number;
	optimize?: boolean;
};

/**
 * Draw an HTMLImageElement to a canvas, then download the created drawing.
 */
export async function downloadImage({
	crop,
	fileName,
	format = 'png',
	image,
	maxWidth,
	optimize = false
}: DownloadImageOptions): Promise<Results> {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	// Determine the scale, since the HTMLImageElement may have been scaled down
	// if it was larger than the resizer area container.
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	// Get the x-y coordinates. If no crop is available, then we'll be using the
	// entire canvas.
	const cropX = (crop.x / 100) * image.width;
	const cropY = (crop.y / 100) * image.height;

	// Get the crop width and height. If no crop is available, we'll be using the
	// entire canvas.
	const cropWidth = (crop.width / 100) * image.width;
	const cropHeight = (crop.height / 100) * image.height;

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

	if (!ctx) {
		throw new Error();
	}

	ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, width, height);
	const imageData = ctx.getImageData(0, 0, width, height);

	let blob: Blob;

	const res = await encodeImage(imageData, format, optimize);

	blob = new Blob([res], { type: MIME_TYPE_MAP[format] });

	const href = URL.createObjectURL(blob);

	const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
	const newFileName = `${fileNameWithoutExtension}.${format}`;

	downloadHref(newFileName, href);

	// Return the output height, width and size for the results table.
	return {
		height,
		size: blob.size,
		width
	};
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

async function encodeImage(data: ImageData, type: Formats, optimize: boolean): Promise<ArrayBuffer> {
	const quality = optimize ? QUALITY_LEVELS.optimize[type] : QUALITY_LEVELS.unoptimized[type];

	if (type === 'avif') {
		const { encode } = await import(/* webpackChunkName: "jsquash-avif" */ '@jsquash/avif');

		return encode(data, { cqLevel: quality });
	}
	if (type === 'png') {
		const { encode } = await import(/* webpackChunkName: "jsquash-png" */ '@jsquash/png');

		if (!optimize) {
			return encode(data);
		} else {
			const result = await encode(data);

			const optimise = await import(/* webpackChunkName: "jsquash-oxipng" */ '@jsquash/oxipng/optimise');

			return optimise.default(result, { level: quality });
		}
	} else if (type === 'jpeg') {
		const { encode } = await import(/* webpackChunkName: "jsquash-jpeg" */ '@jsquash/jpeg');

		return encode(data, { quality });
	} else if (type === 'webp') {
		const { encode } = await import(/* webpackChunkName: "jsquash-webp" */ '@jsquash/webp');

		return encode(data, { quality });
	}

	return data.data;
}
