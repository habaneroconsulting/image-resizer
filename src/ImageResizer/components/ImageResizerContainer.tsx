/** @jsxImportSource @emotion/react */

import { ImageResizer } from './ImageResizer';

export const ImageResizerContainer = () => {
	const urlParams = new URLSearchParams(window.location.search);

	return (
		<ImageResizer
			aspectRatioHeight={urlParams.get('ar-h')}
			aspectRatioWidth={urlParams.get('ar-w')}
			format={urlParams.get('format')}
			id={urlParams.get('id')}
			lockAspectRatio={urlParams.get('lock-aspect-ratio') === 'true'}
			optimize={urlParams.get('optimize') === 'true'}
			maxWidth={urlParams.get('max-w')}
		/>
	);
};

ImageResizerContainer.displayName = 'ImageResizerContainer';
