/** @jsx jsx  */

import { jsx } from '@emotion/core';

import { ImageResizer } from './ImageResizer';

export const ImageResizerContainer = () => {
	const urlParams = new URLSearchParams(window.location.search);

	return (
		<ImageResizer
			aspectRatioHeight={urlParams.get('ar-h')}
			aspectRatioWidth={urlParams.get('ar-w')}
			format={urlParams.get('format')}
			maxHeight={urlParams.get('max-h')}
			maxWidth={urlParams.get('max-w')}
		/>
	);
};

ImageResizerContainer.displayName = 'ImageResizerContainer';
