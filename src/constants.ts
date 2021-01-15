import { FormState } from 'ImageResizer/types';
import { detectWebPCanvasSupport } from 'ImageResizer/utilities/detect-webp-canvas-support';

export const DEFAULT_ASPECT_RATIO_HEIGHT = 1;
export const DEFAULT_ASPECT_RATIO_WIDTH = 1;
export const DEFAULT_FORMAT = 'jpg';
export const DEFAULT_MAX_WIDTH = 1000;
export const IMAGE_FORMAT_OPTIONS = [
	{
		key: 'jpg',
		text: 'JPG (photography)'
	},
	{
		key: 'png',
		text: 'PNG (illustrations, text or transparency)'
	}
];

if (detectWebPCanvasSupport()) {
	IMAGE_FORMAT_OPTIONS.push({
		key: 'webp',
		text: 'WebP'
	});
}

export const COMMON_OPTIONS = {
	crop: true,
	format: 'jpg',
	lockAspectRatio: true,
	optimize: false,
	preventScalingUp: true
};

export const PRESET_OPTIONS: { [k: string]: FormState } = {
	OPENGRAPH: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 630,
		aspectRatioWidth: 1200,
		id: 'OPENGRAPH',
		maxWidth: 1200,
		text: 'Open Graph'
	},
	FACEBOOK_COVER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 312,
		aspectRatioWidth: 820,
		id: 'FACEBOOK_COVER_PHOTO',
		maxWidth: 820,
		text: 'Cover photo'
	},
	FACEBOOK_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 630,
		aspectRatioWidth: 1200,
		id: 'FACEBOOK_POST',
		maxWidth: 1200,
		text: 'Post'
	},
	FACEBOOK_SQUARE_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1200,
		aspectRatioWidth: 1200,
		id: 'FACEBOOK_SQUARE_POST',
		maxWidth: 1200,
		text: 'Square post'
	},
	TWITTER_HEADER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 500,
		aspectRatioWidth: 1500,
		id: 'TWITTER_HEADER_PHOTO',
		maxWidth: 1500,
		text: 'Header photo'
	},
	TWITTER_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 512,
		aspectRatioWidth: 1012,
		id: 'TWITTER_POST',
		maxWidth: 1012,
		text: 'Post'
	},
	LINKEDIN_COVER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 396,
		aspectRatioWidth: 1584,
		id: 'LINKEDIN_COVER_PHOTO',
		maxWidth: 1584,
		text: 'Cover photo'
	},
	LINKEDIN_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 628,
		aspectRatioWidth: 1200,
		id: 'LINKEDIN_POST',
		maxWidth: 1200,
		text: 'Post'
	}
};
