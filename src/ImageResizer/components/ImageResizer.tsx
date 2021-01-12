/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import React, { useCallback, useState, useRef } from 'react';

import type { Crop } from 'react-image-crop';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Spinner } from '@fluentui/react/lib/Spinner';

import { DEFAULT_FORMAT } from '../../constants';
import { downloadImage } from '../utilities/download-image';
import { DropzoneContainer } from './DropzoneContainer';
import { FileState, Status, Results, FormState } from '../types';
import { Footer } from './Footer';
import { Header } from './Header';
import { ImageResizerForm } from './ImageResizerForm';
import { ResultsTable } from './ResultsTable';

type ImageResizerProps = {
	aspectRatioHeight?: string;
	aspectRatioWidth?: string;
	format?: string;
	maxWidth?: string;
	maxHeight?: string;
};

const DEFAULT_FILE_STATE: FileState = { status: Status.Initial };
const SIDEBAR_WIDTH = 320;

const ReactImageCrop = React.lazy(() => import(/* webpackChunkName: "ReactImageCrop" */ './ReactImageCrop'));

/**
 * Main image resizer component. Keeps state for the form, drop zone and crop
 * area.
 */
export const ImageResizer = (props: ImageResizerProps) => {
	const hasDefaultAspectRatio = !!props.aspectRatioHeight && !!props.aspectRatioWidth;
	const defaultAspectRatioHeight = parseFloat(props.aspectRatioHeight);
	const defaultAspectRatioWidth = parseFloat(props.aspectRatioWidth);
	const defaultAspectRatio = hasDefaultAspectRatio ? defaultAspectRatioWidth / defaultAspectRatioHeight : undefined;

	const theme = useTheme();
	const imageRef = useRef<HTMLImageElement>();

	const [crop, setCrop] = useState<Crop>({ aspect: defaultAspectRatio });
	const [fileState, setFileState] = useState<FileState>(DEFAULT_FILE_STATE);
	const [formState, setFormState] = useState<FormState>({
		aspectRatioHeight: hasDefaultAspectRatio ? defaultAspectRatioHeight : null,
		aspectRatioWidth: hasDefaultAspectRatio ? defaultAspectRatioWidth : null,
		crop: true,
		lockAspectRatio: hasDefaultAspectRatio,
		format: props.format || DEFAULT_FORMAT,
		maxWidth: props.maxWidth ? parseInt(props.maxWidth) : undefined,
		preventScalingUp: true
	});
	const [results, setResults] = useState<Results>();

	//#region CALLBACKS

	/**
	 * Return the current aspect ratio of the form to create a crop object.
	 */
	const getAspectRatio = useCallback(() => {
		return formState.aspectRatioWidth / formState.aspectRatioHeight;
	}, [formState.aspectRatioWidth, formState.aspectRatioHeight]);

	/**
	 * Create a default crop for the current image using the form aspect ratio.
	 * This involves determining the x and y coordinates and width and height of
	 * the crop based on the form aspect ratio and current image.
	 */
	const setDefaultCrop = useCallback(() => {
		if (!imageRef.current) {
			return;
		}

		const aspect = getAspectRatio();
		const image = imageRef.current;

		const defaultCrop = {
			aspect,
			unit: 'px',
			x: 0,
			y: 0
		} as const;

		// If the image is too wide for the aspect ratio, then the crop can be full
		// height and centered horizontally (x-axis).
		if (image.width / aspect > image.height) {
			setCrop({
				...defaultCrop,
				height: image.height,
				width: image.height * aspect,
				x: (image.width - image.height * aspect) / 2
			});
		}
		// If the image is too tall for the aspect ratio, then the crop can be full
		// width and centered vertically (y-axis).
		else {
			setCrop({
				...defaultCrop,
				height: image.width / aspect,
				width: image.width,
				y: (image.height - image.width / aspect) / 2
			});
		}
	}, [imageRef, getAspectRatio]);

	/**
	 * When deselected, reset the crop state.
	 */
	const resetCrop = useCallback(() => {
		// If we have existing aspect ratio form values, keep the aspect ratio
		// locked.
		if (formState.aspectRatioHeight && formState.aspectRatioWidth) {
			setCrop({ aspect: formState.aspectRatioWidth / formState.aspectRatioHeight });
		}
		// Otherwise, remove the aspect ratio.
		else {
			setCrop({});
		}
	}, [formState.aspectRatioHeight, formState.aspectRatioWidth]);

	/**
	 * When files get successfully dropped onto the drop zone, or added by the
	 * file picker, load them into our crop tool and set a default crop.
	 */
	const onDrop = useCallback(
		(files: File[]) => {
			const file = files[0];

			setFileState({
				status: Status.Success,
				file,
				src: URL.createObjectURL(file)
			});

			// @todo: Once the file state above loads, several renders are required
			// before we can set a default crop. Need to determine a better way of
			// programmatically determining this, rather than using a timeout.
			setTimeout(() => {
				setDefaultCrop();
			}, 250);
		},
		[setDefaultCrop]
	);

	/**
	 * Reset the image, crop and dropzone when an image is removed.
	 */
	const resetImage = useCallback(() => {
		resetCrop();
		setFileState(DEFAULT_FILE_STATE);
		setResults(undefined);
	}, [resetCrop]);

	/**
	 * When the form is submitted or download button is clicked, generate a new
	 * image.
	 */
	const onSubmit = useCallback(async () => {
		// Ignore this if there is no image available.
		if (imageRef.current === null || fileState === undefined) {
			return;
		}

		// Ignore this if we are currently handling the download of an image already.
		if (fileState.status !== Status.Success && fileState.status !== Status.Downloading) {
			return;
		}

		setFileState({ status: Status.Downloading, file: fileState.file, src: fileState.src });

		const maxWidth = formState.preventScalingUp
			? Math.min(formState.maxWidth, imageRef.current.naturalWidth)
			: formState.maxWidth;

		// Generate the image.
		const results = await downloadImage({
			crop,
			fileName: fileState.file.name,
			format: formState.format,
			image: imageRef.current,
			maxWidth
		});

		setResults(results);

		setFileState({ status: Status.Success, file: fileState.file, src: fileState.src });
	}, [crop, fileState, formState, imageRef, setFileState, setResults]);

	//#endregion CALLBACKS

	//#region USEEFFECTS

	/**
	 * Enable or disable crop when the state value changes.
	 */
	React.useEffect(() => {
		console.info(`[ImageResizer] The crop toggle has been changed to ${formState.crop}.`);

		if (formState.crop) {
			setDefaultCrop();
		} else {
			setCrop({});
		}
	}, [formState.crop, setDefaultCrop]);

	/**
	 * Enable or disable the locked image ratio.
	 */
	React.useEffect(() => {
		console.info(`[ImageResizer] The lock aspect ratio toggle has been changed to ${formState.lockAspectRatio}.`);

		if (formState.lockAspectRatio) {
			setDefaultCrop();
		} else {
			setCrop((prevState) => {
				return { ...prevState, aspect: undefined };
			});
		}
	}, [formState.lockAspectRatio, setDefaultCrop]);

	// Re-set the crop.
	React.useEffect(() => {
		console.info(
			`[ImageResizer] The aspect ratio has changed to ${formState.aspectRatioWidth}:${formState.aspectRatioHeight}.`
		);

		if (formState.aspectRatioWidth && formState.aspectRatioHeight) {
			setDefaultCrop();
			setFormState((prevState) => ({ ...prevState, crop: true }));
		}
	}, [formState.aspectRatioHeight, formState.aspectRatioWidth, setDefaultCrop]);

	//#endregion USEEFFECTS

	return (
		<React.Fragment>
			<div
				css={{
					backgroundColor: theme.colors.white,
					borderRight: `1px solid ${theme.colors.neutralLight}`,
					height: '100%',
					left: 0,
					overflowY: 'scroll',
					paddingBottom: theme.space[3],
					paddingTop: theme.space[3],
					position: 'fixed',
					width: SIDEBAR_WIDTH
				}}
			>
				<Header />

				<ImageResizerForm
					isDownloading={fileState.status === Status.Downloading}
					image={imageRef.current}
					formState={formState}
					setFormState={setFormState}
					onSubmit={onSubmit}
				/>

				{fileState.status === Status.Downloading && <Spinner>Compressing image...</Spinner>}

				<hr />

				{results && fileState.status === Status.Success && (
					<React.Fragment>
						<ResultsTable
							results={[
								{
									name: 'Original',
									width: imageRef.current.naturalWidth,
									height: imageRef.current.naturalHeight,
									size: fileState.file.size
								},
								{
									name: 'New',
									width: results.width,
									height: results.height,
									size: results.size
								}
							]}
						/>
						<hr />
					</React.Fragment>
				)}

				<Footer />
			</div>

			<div
				css={{
					alignItems: 'center',
					backgroundColor: theme.colors.neutralLighterAlt,
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'center',
					padding: theme.space[6],
					paddingLeft: SIDEBAR_WIDTH + theme.space[6]
				}}
			>
				{fileState.status === Status.Initial && <DropzoneContainer onDropAccepted={onDrop} />}

				{fileState.status === Status.Loading && <Spinner>Loading image...</Spinner>}

				{(fileState.status === Status.Success || fileState.status === Status.Downloading) && (
					<div
						css={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
							maxWidth: imageRef?.current?.naturalWidth
						}}
					>
						<div
							css={{
								display: 'flex',
								justifyContent: 'center'
							}}
						>
							<ActionButton
								disabled={!crop || isNaN(crop.height) || (crop.width === 0 && crop.height === 0)}
								iconProps={{
									iconName: 'ClearSelection'
								}}
								onClick={resetCrop}
								styles={{
									root: {
										whiteSpace: 'nowrap'
									},
									icon: {
										color: theme.colors.themePrimary
									}
								}}
							>
								Deselect crop
							</ActionButton>

							<ActionButton
								disabled={fileState.status === Status.Downloading}
								iconProps={{
									iconName: 'RemoveFilter'
								}}
								onClick={resetImage}
								styles={{
									root: {
										whiteSpace: 'nowrap'
									},
									icon: {
										color: theme.colors.themePrimary
									}
								}}
							>
								Replace image
							</ActionButton>
						</div>

						<div
							css={{
								boxShadow: theme.shadows.depth16,
								maxHeight: 'calc(100% - 40px)'
							}}
						>
							<React.Suspense fallback={<div />}>
								<ReactImageCrop
									crop={crop}
									disabled={!formState.crop || fileState.status === Status.Downloading}
									locked={!formState.crop || fileState.status === Status.Downloading}
									onChange={(newCrop) => {
										requestAnimationFrame(() => setCrop(newCrop));
									}}
									onImageLoaded={(image) => {
										imageRef.current = image;

										if (!formState.crop) {
											return;
										}

										requestAnimationFrame(setDefaultCrop);
									}}
									ruleOfThirds={true}
									src={fileState.src}
								/>
							</React.Suspense>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

ImageResizer.displayName = 'ImageResizer';
