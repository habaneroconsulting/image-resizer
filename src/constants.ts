import { FormState } from 'ImageResizer/types';
import { detectWebPCanvasSupport } from 'ImageResizer/utilities/detect-webp-canvas-support';

export const DEFAULT_ASPECT_RATIO_HEIGHT = 1;
export const DEFAULT_ASPECT_RATIO_WIDTH = 1;
export const DEFAULT_FORMAT = 'jpg';
export const DEFAULT_MAX_WIDTH = 1000;
export const IMAGE_FORMAT_OPTIONS = [
	{
		key: 'jpg',
		text: 'JPG (photography)',
		optimize: true
	},
	{
		key: 'png',
		text: 'PNG (illustrations, text or transparency)',
		optimize: true
	},
	{
		key: 'gif',
		text: 'GIF',
		optimize: false
	},
	{
		key: 'tiff',
		text: 'TIFF',
		optimize: false
	}
];

if (detectWebPCanvasSupport()) {
	IMAGE_FORMAT_OPTIONS.push({
		key: 'webp',
		text: 'WebP',
		optimize: false
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
	INSTAGRAM_SQUARE_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1080,
		aspectRatioWidth: 1080,
		id: 'INSTAGRAM_SQUARE_POST',
		maxWidth: 1080,
		text: 'Square post'
	},
	INSTAGRAM_LANDSCAPE_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 566,
		aspectRatioWidth: 1080,
		id: 'INSTAGRAM_LANDSCAPE_POST',
		maxWidth: 1080,
		text: 'Landscape post'
	},
	INSTAGRAM_PORTRAIT_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1350,
		aspectRatioWidth: 1080,
		id: 'INSTAGRAM_PORTRAIT_POST',
		maxWidth: 1080,
		text: 'Portrait post'
	},
	INSTAGRAM_STORY: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1920,
		aspectRatioWidth: 1080,
		id: 'INSTAGRAM_STORY',
		maxWidth: 1080,
		text: 'Story'
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
	}
};
