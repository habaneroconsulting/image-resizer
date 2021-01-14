import { FormState } from 'ImageResizer/types';

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

export const COMMON_OPTIONS = {
	crop: true,
	format: 'png',
	lockAspectRatio: true,
	preventScalingUp: true
};

export const PRESET_OPTIONS: { [k: string]: FormState } = {
	OPENGRAPH: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 630,
		aspectRatioWidth: 1200,
		key: 'OPENGRAPH',
		maxWidth: 1200
	},
	FACEBOOK_COVER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 312,
		aspectRatioWidth: 820,
		key: 'FACEBOOK_COVER_PHOTO',
		maxWidth: 820
	},
	FACEBOOK_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 630,
		aspectRatioWidth: 1200,
		key: 'FACEBOOK_POST',
		maxWidth: 1200
	},
	FACEBOOK_SQUARE_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1200,
		aspectRatioWidth: 1200,
		key: 'FACEBOOK_SQUARE_POST',
		maxWidth: 1200
	},
	TWITTER_HEADER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 500,
		aspectRatioWidth: 1500,
		key: 'TWITTER_HEADER_PHOTO',
		maxWidth: 1500
	},
	TWITTER_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 512,
		aspectRatioWidth: 1012,
		key: 'TWITTER_POST',
		maxWidth: 1012
	},
	LINKEDIN_COVER_PHOTO: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 396,
		aspectRatioWidth: 1584,
		key: 'LINKEDIN_COVER_PHOTO',
		maxWidth: 1584
	},
	LINKEDIN_POST: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 628,
		aspectRatioWidth: 1200,
		key: 'LINKEDIN_POST',
		maxWidth: 1200
	}
};
