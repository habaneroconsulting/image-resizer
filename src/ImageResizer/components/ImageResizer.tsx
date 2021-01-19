/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Spinner } from '@fluentui/react/lib/Spinner';
import React, { useCallback, useState, useRef } from 'react';
import type { Crop } from 'react-image-crop';

import { DEFAULT_FORMAT, DEFAULT_ID, PRESET_OPTIONS } from '../../constants';
import { DropzoneContainer } from './DropzoneContainer';
import { Footer } from './Footer';
import { Header } from './Header';
import { ImageResizerForm } from './ImageResizerForm';
import { FileState, Status, FormState } from '../types';
import { downloadImage } from '../utilities/download-image';
import { getReadableSize } from '../utilities/get-readable-size';

type ImageResizerProps = {
	aspectRatioHeight?: string;
	aspectRatioWidth?: string;
	format?: string;
	id?: string;
	lockAspectRatio?: boolean;
	maxWidth?: string;
	optimize?: boolean;
};

const DEFAULT_FILE_STATE: FileState = { status: Status.Initial };
const SIDEBAR_WIDTH = 320;

const ImageCrop = React.lazy(() => import(/* webpackChunkName: "ImageCrop" */ './ImageCrop'));

/**
 * Main image resizer component. Keeps state for the form, drop zone and crop
 * area.
 */
export const ImageResizer = (props: ImageResizerProps) => {
	const theme = useTheme();
	const imageRef = useRef<HTMLImageElement>();

	const [crop, setCrop] = useState<Crop>({ unit: '%' });
	const [fileState, setFileState] = useState<FileState>(DEFAULT_FILE_STATE);

	let defaultFormState: FormState = {
		aspectRatioHeight: parseFloat(props.aspectRatioHeight),
		aspectRatioWidth: parseFloat(props.aspectRatioWidth),
		format: props.format || DEFAULT_FORMAT,
		id: DEFAULT_ID,
		optimize: false,
		lockAspectRatio: props.lockAspectRatio || (!!props.aspectRatioHeight && !!props.aspectRatioWidth),
		maxWidth: props.maxWidth ? parseInt(props.maxWidth) : undefined,
		text: 'Custom'
	};

	if (props.id in PRESET_OPTIONS) {
		defaultFormState = {
			...defaultFormState,
			...PRESET_OPTIONS[props.id],
			optimize: props.optimize
		};
	}

	const [formState, setFormState] = useState<FormState>(defaultFormState);

	//#region CALLBACKS

	/**
	 * Create a default crop for the current image using the form aspect ratio.
	 * This involves determining the x and y coordinates and width and height of
	 * the crop based on the form aspect ratio and current image.
	 */
	const setDefaultCrop = useCallback(() => {
		if (!imageRef.current) {
			return;
		}

		const aspectRatio = formState.aspectRatioWidth / formState.aspectRatioHeight;
		const image = imageRef.current;

		const defaultCrop = {
			unit: '%',
			x: 0,
			y: 0
		} as const;

		// If there is no aspect ratio yet, assume we have a new image. Set the aspect
		// ratio form fields and add a default crop.
		if (isNaN(aspectRatio)) {
			setFormState((prevState) => ({
				...prevState,
				aspectRatioHeight: image.naturalHeight,
				aspectRatioWidth: image.naturalWidth,
				lockAspectRatio: true,
				maxWidth: image.naturalWidth
			}));

			setCrop({
				...defaultCrop,
				height: 100,
				width: 100
			});
		}
		// If the image is too wide for the aspect ratio, then the crop can be full
		// height and centered horizontally (x-axis).
		else if (image.width / aspectRatio > image.height) {
			const width = (image.height / image.width) * aspectRatio * 100;

			setCrop({
				...defaultCrop,
				height: 100,
				width,
				x: (100 - width) / 2
			});
		}
		// If the image is too tall for the aspect ratio, then the crop can be full
		// width and centered vertically (y-axis).
		else {
			const height = (image.width / image.height / aspectRatio) * 100;

			setCrop({
				...defaultCrop,
				height,
				width: 100,
				y: (100 - height) / 2
			});
		}
	}, [imageRef, formState.aspectRatioHeight, formState.aspectRatioWidth]);

	/**
	 * When deselected, reset the crop state.
	 */
	const resetCrop = useCallback(() => {
		// If we have existing aspect ratio form values, keep the aspect ratio
		// locked.
		if (formState.aspectRatioHeight && formState.aspectRatioWidth) {
			setCrop({ aspect: formState.aspectRatioWidth / formState.aspectRatioHeight, x: 0, y: 0 });
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

		// Generate the image.
		const results = await downloadImage({
			crop,
			fileName: fileState.file.name,
			format: formState.format,
			image: imageRef.current,
			optimize: formState.optimize,
			maxWidth: formState.maxWidth
		});

		// Temporarily show stats within the console area.
		console.table([
			{
				name: 'Original',
				width: imageRef.current.naturalWidth,
				height: imageRef.current.naturalHeight,
				size: getReadableSize(fileState.file.size)
			},
			{
				name: 'New',
				width: results.width,
				height: results.height,
				size: getReadableSize(results.size)
			}
		]);

		setFileState({ status: Status.Success, file: fileState.file, src: fileState.src });
	}, [crop, fileState, formState, imageRef, setFileState]);

	//#endregion CALLBACKS

	//#region USEEFFECTS

	// Re-set the crop.
	React.useEffect(() => {
		console.info(
			`[ImageResizer] The aspect ratio has changed to ${formState.aspectRatioWidth}:${formState.aspectRatioHeight}.`
		);

		if (formState.change === 'input' && formState.aspectRatioWidth && formState.aspectRatioHeight) {
			setDefaultCrop();
		}
	}, [formState.aspectRatioHeight, formState.aspectRatioWidth, formState.change, setDefaultCrop]);

	//#endregion USEEFFECTS

	return (
		<React.Fragment>
			<div
				css={{
					backgroundColor: theme.colors.white,
					borderRight: `1px solid ${theme.colors.neutralLight}`,
					bottom: 64,
					label: 'sidebar',
					left: 0,
					overflowX: 'hidden',
					overflowY: 'scroll',
					paddingTop: theme.space[3],
					position: 'fixed',
					top: 0,
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
			</div>

			<div
				css={{
					backgroundColor: theme.colors.neutralLighterAlt,
					display: 'grid',
					height: '100%',
					gridTemplateRows: '1fr auto',
					label: 'center',
					padding: theme.space[6],
					paddingBottom: theme.space[5],
					paddingLeft: SIDEBAR_WIDTH + theme.space[6]
				}}
			>
				<div
					css={{
						alignItems: 'center',
						display: 'flex',
						label: 'container',
						justifyContent: 'center'
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
									disabled={isNaN(crop.height) || (crop.width === 0 && crop.height === 0)}
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
									maxHeight: 'calc(100% - 40px)',
									userSelect: 'none'
								}}
							>
								<React.Suspense fallback={<div />}>
									<ImageCrop
										crop={{
											...crop,
											aspect: formState.lockAspectRatio
												? formState.aspectRatioWidth / formState.aspectRatioHeight
												: null
										}}
										disabled={fileState.status === Status.Downloading}
										locked={fileState.status === Status.Downloading}
										onComplete={(newCrop, percentageCrop) => {
											// If the crop completes with no width or height, we can assume that
											// the user clicked outside of the marquee.
											if (newCrop.width === 0 && newCrop.height === 0) {
												// Force a reset, so no x/y values remain in the crop.
												resetCrop();
											} else {
												setCrop(percentageCrop);

												setFormState((prevState) => ({
													...prevState,
													change: 'crop',
													aspectRatioHeight: Math.round((percentageCrop.height * imageRef.current.naturalHeight) / 100),
													aspectRatioWidth: Math.round((percentageCrop.width * imageRef.current.naturalWidth) / 100)
												}));
											}
										}}
										onImageLoaded={(image) => {
											imageRef.current = image;

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

				<Footer />
			</div>
		</React.Fragment>
	);
};

ImageResizer.displayName = 'ImageResizer';
