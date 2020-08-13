/** @jsx jsx  */

import { jsx } from '@emotion/core';
import React from 'react';

import { Button } from '@fluentui/react/lib/Button';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { Toggle } from '@fluentui/react/lib/Toggle';

import {
	DEFAULT_ASPECT_RATIO_HEIGHT,
	DEFAULT_ASPECT_RATIO_WIDTH,
	DEFAULT_MAX_WIDTH,
	IMAGE_FORMAT_OPTIONS
} from '../../constants';
import { Fieldset } from './Fieldset';
import { FormState } from '../types';
import { SpinButtonContainer } from '../../Shared/components/SpinButtonContainer';
import { useTheme } from '../../Theme/use-theme';

type ImageResizerFormProps = {
	isDownloading?: boolean;
	image?: HTMLImageElement;
	formState: FormState;
	onSubmit: () => any;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;
};

export const ImageResizerForm = ({
	isDownloading = false,
	image,
	formState,
	onSubmit,
	setFormState
}: ImageResizerFormProps) => {
	const theme = useTheme();

	// If prevent scaling up is on, then the maximum width should not be larger
	// than the image's natural width, so take the smaller number of the default
	// form state width or the natural width.
	// If no image is available yet, default to the form state width.
	let maxWidth = formState.maxWidth;

	if (formState.preventScalingUp) {
		if (formState.maxWidth && image?.naturalWidth) {
			maxWidth = Math.min(formState.maxWidth, image.naturalWidth);
		} else if (image?.naturalWidth) {
			maxWidth = image.naturalWidth;
		}
	}

	const aspectRatioDisabled = !formState.crop || !formState.lockAspectRatio;
	const aspectRatioHeightValue = aspectRatioDisabled ? '' : formState.aspectRatioHeight?.toString() ?? '1';
	const aspectRatioWidthValue = aspectRatioDisabled ? '' : formState.aspectRatioWidth?.toString() ?? '1';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				onSubmit();
			}}
		>
			<div>
				<Fieldset legend="Size">
					<div
						css={{
							display: 'grid',
							gridGap: theme.space[3],
							gridTemplateColumns: '1fr 1fr'
						}}
					>
						<SpinButtonContainer
							disabled={isDownloading}
							label={'Width'}
							max={maxWidth}
							onBlur={(e) => {
								let value = e.currentTarget.value;

								if (value === Infinity.toString()) {
									value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
								}

								const newMaxWidth = parseInt(value);

								setFormState((prevState) => ({ ...prevState, maxWidth: newMaxWidth }));
							}}
							onDecrement={(value) => {
								if (value === Infinity.toString()) {
									value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
								}

								const newMaxWidth = parseInt(value);

								setFormState((prevState) => ({ ...prevState, maxWidth: newMaxWidth }));

								return `${newMaxWidth} px`;
							}}
							onIncrement={(value) => {
								if (value === Infinity.toString()) {
									value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
								}

								const newMaxWidth = parseInt(value);

								setFormState((prevState) => ({ ...prevState, maxWidth: newMaxWidth }));

								return `${newMaxWidth} px`;
							}}
							step={1}
							value={maxWidth === Infinity || isNaN(maxWidth) ? '' : `${maxWidth} px`}
						/>

						<Toggle
							checked={formState.preventScalingUp}
							disabled={isDownloading}
							label="Prevent scaling up?"
							offText="Off"
							onChange={(_e, preventScalingUp) =>
								setFormState((prevState) => ({
									...prevState,
									maxWidth: preventScalingUp ? image?.naturalWidth ?? undefined : maxWidth,
									preventScalingUp
								}))
							}
							onText="On"
						/>
					</div>
				</Fieldset>

				<hr />

				<Fieldset legend="Cropping">
					<div
						css={{
							display: 'grid',
							gridGap: theme.space[3],
							gridTemplateColumns: '1fr 1fr'
						}}
					>
						<Toggle
							checked={formState.crop}
							disabled={isDownloading}
							label="Crop?"
							offText="Off"
							onChange={(_e, crop) => setFormState((prevState) => ({ ...prevState, crop }))}
							onText="On"
						/>

						<Toggle
							checked={formState.lockAspectRatio}
							disabled={isDownloading || !formState.crop}
							label="Lock aspect ratio?"
							offText="Off"
							onChange={(_e, lockAspectRatio) =>
								setFormState((prevState) => ({
									...prevState,
									aspectRatioHeight: prevState.aspectRatioHeight ?? 1,
									aspectRatioWidth: prevState.aspectRatioWidth ?? 1,
									lockAspectRatio
								}))
							}
							onText="On"
						/>

						<SpinButtonContainer
							disabled={isDownloading || aspectRatioDisabled}
							label={'Ratio width'}
							max={Infinity}
							min={0.1}
							onBlur={(e) => {
								const value = e.currentTarget.value;
								let aspectRatioWidth = parseFloat(parseFloat(value).toFixed(1));

								if (isNaN(aspectRatioWidth)) {
									aspectRatioWidth = DEFAULT_ASPECT_RATIO_WIDTH;
								}

								setFormState((prevState) => ({ ...prevState, aspectRatioWidth }));
							}}
							onDecrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value) }));
							}}
							onIncrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value) }));
							}}
							step={0.1}
							value={aspectRatioWidthValue}
						/>

						<SpinButtonContainer
							disabled={isDownloading || aspectRatioDisabled}
							label={'Ratio height'}
							max={Infinity}
							onBlur={(e) => {
								const value = e.currentTarget.value;
								let aspectRatioHeight = parseFloat(parseFloat(value).toFixed(1));

								if (isNaN(aspectRatioHeight)) {
									aspectRatioHeight = DEFAULT_ASPECT_RATIO_HEIGHT;
								}

								setFormState((prevState) => ({ ...prevState, aspectRatioHeight }));
							}}
							onDecrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioHeight: parseFloat(value) }));
							}}
							onIncrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioHeight: parseFloat(value) }));
							}}
							step={0.1}
							value={aspectRatioHeightValue}
						/>
					</div>
				</Fieldset>

				<hr />

				<Fieldset legend="Image format">
					<ChoiceGroup
						disabled={isDownloading}
						label="Image format"
						selectedKey={formState.format}
						options={IMAGE_FORMAT_OPTIONS}
						onChange={(_e, option) => {
							const format = option.key;

							setFormState((prevState) => ({ ...prevState, format }));
						}}
					/>
				</Fieldset>

				<hr />

				<Fieldset>
					<Button
						css={{
							width: '100%'
						}}
						disabled={isDownloading || !image?.currentSrc}
						iconProps={{
							iconName: 'Download'
						}}
						onClick={onSubmit}
					>
						Download resized image
					</Button>
				</Fieldset>
			</div>
		</form>
	);
};

ImageResizerForm.displayName = 'ImageResizerForm';
