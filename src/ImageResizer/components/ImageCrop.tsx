import ReactImageCrop, { Crop, ReactCropProps } from 'react-image-crop';
import { ReactEventHandler, useEffect, useState } from 'react';

// Created a separate component to help dynamically load CSS.
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropProps = Omit<ReactCropProps, 'onChange'> & {
	onImageLoad: ReactEventHandler<HTMLImageElement>;
	src: string;
};

export const ImageCrop = ({ crop, src, onImageLoad, ...props }: ImageCropProps) => {
	// Use an intermediate state variable for cropping so that our application doesn't
	// have to re-render on individual changes. This keeps the crop marquee tool fast.
	const [intermediateCrop, setIntermediateCrop] = useState<Crop | undefined>(crop);

	// When the crop prop changes, reset our intermediate state to the new state.
	useEffect(() => {
		setIntermediateCrop(crop);
	}, [crop]);

	return (
		<ReactImageCrop crop={intermediateCrop} onChange={(newCrop) => setIntermediateCrop(newCrop)} {...props}>
			<img src={src} onLoad={onImageLoad} />
		</ReactImageCrop>
	);
};

export default ImageCrop;
