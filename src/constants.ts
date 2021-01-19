export const DEFAULT_ASPECT_RATIO_HEIGHT = 1;
export const DEFAULT_ASPECT_RATIO_WIDTH = 1;
export const DEFAULT_FORMAT = 'jpg';

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
		key: 'webp',
		text: 'WebP',
		optimize: false
	}
];

export const DEFAULT_ID = 'CUSTOM';

export const COMMON_OPTIONS = {
	lockAspectRatio: true,
	optimize: false,
	preventScalingUp: false
};

export const PRESET_OPTIONS = {
	OPENGRAPH: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 630,
		aspectRatioWidth: 1200,
		id: 'OPENGRAPH',
		maxWidth: 1200,
		text: 'Open Graph image'
	},
	HD720: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 720,
		aspectRatioWidth: 1280,
		id: '720p',
		maxWidth: 1280,
		text: '720p (16:9)'
	},
	HD1080: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 1080,
		aspectRatioWidth: 1920,
		id: '1080p',
		maxWidth: 1920,
		text: '1080p (16:9)'
	},
	UHD: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 2160,
		aspectRatioWidth: 3840,
		id: '4K',
		maxWidth: 3840,
		text: '4K (16:9)'
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
	},
	SHAREPOINT_TILE: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 903,
		aspectRatioWidth: 1204,
		id: 'SHAREPOINT_TILE',
		maxWidth: 1204,
		text: 'Tile image (4:3)'
	},
	SHAREPOINT_WIDE: {
		...COMMON_OPTIONS,
		aspectRatioHeight: 677,
		aspectRatioWidth: 1204,
		id: 'SHAREPOINT_WIDE',
		maxWidth: 1204,
		text: 'Wide image (16:9)'
	}
};
