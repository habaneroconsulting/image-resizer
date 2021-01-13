/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Dispatch, SetStateAction } from 'react';

import {
	DEFAULT_ASPECT_RATIO_HEIGHT,
	DEFAULT_ASPECT_RATIO_WIDTH,
	DEFAULT_MAX_WIDTH,
	IMAGE_FORMAT_OPTIONS,
	PRESET_OPTIONS
} from '../../constants';
import { CategorizedChoiceGroup } from './CategorizedChoiceGroup';
import { Fieldset } from './Fieldset';
import { FormState } from '../types';
import { SpinButtonContainer } from '../../Shared/components/SpinButtonContainer';

type ImageResizerFormProps = {
	children?: React.ReactNode;
	isDownloading?: boolean;
	image?: HTMLImageElement;
	formState: FormState;
	onSubmit: () => any;
	setFormState: Dispatch<SetStateAction<FormState>>;
};

export const ImageResizerForm = ({
	children,
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
				<Fieldset>
					<CategorizedChoiceGroup
						label="Preset options"
						name="preset-options"
						onChange={(_e, { key }) => {
							if (!(key in PRESET_OPTIONS)) {
								setFormState((prevState) => ({ ...prevState, key: 'CUSTOM' }));

								return;
							}

							// Set preset options on top of previous state.
							setFormState((prevState) => ({ ...prevState, ...PRESET_OPTIONS[key] }));
						}}
						groups={[
							{
								options: [
									{ key: 'CUSTOM', text: 'Custom' },
									{
										...PRESET_OPTIONS.OPENGRAPH,
										text: 'Open Graph',
										aspectRatioLabel: '1200x630'
									}
								]
							},
							{
								label: 'Facebook',
								options: [
									{
										...PRESET_OPTIONS.FACEBOOK_COVER_PHOTO,
										text: 'Cover photo',
										aspectRatioLabel: '820x312'
									},
									{
										...PRESET_OPTIONS.FACEBOOK_POST,
										text: 'Post',
										aspectRatioLabel: '1200x630'
									},
									{
										...PRESET_OPTIONS.FACEBOOK_SQUARE_POST,
										text: 'Square post',
										aspectRatioLabel: '1200x1200'
									}
								]
							},
							{
								label: 'Twitter',
								options: [
									{
										...PRESET_OPTIONS.TWITTER_HEADER_PHOTO,
										text: 'Header photo',
										aspectRatioLabel: '1500x500'
									},
									{
										...PRESET_OPTIONS.TWITTER_POST,
										text: 'Post',
										aspectRatioLabel: '1012x512'
									}
								]
							},
							{
								label: 'LinkedIn',
								options: [
									{
										...PRESET_OPTIONS.LINKEDIN_COVER_PHOTO,
										text: 'Cover photo',
										aspectRatioLabel: '1584x396'
									},
									{
										...PRESET_OPTIONS.LINKEDIN_POST,
										text: 'Post',
										aspectRatioLabel: '1200x628'
									}
								]
							},
							{
								label: 'Instagram',
								options: []
							}
						]}
						value={formState.key}
					/>
				</Fieldset>

				<hr />

				<Fieldset>
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

								setFormState((prevState) => ({ ...prevState, key: 'CUSTOM', maxWidth: newMaxWidth }));
							}}
							onDecrement={(value) => {
								if (value === Infinity.toString()) {
									value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
								}

								const newMaxWidth = parseInt(value);

								setFormState((prevState) => ({ ...prevState, key: 'CUSTOM', maxWidth: newMaxWidth }));

								return `${newMaxWidth} px`;
							}}
							onIncrement={(value) => {
								if (value === Infinity.toString()) {
									value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
								}

								const newMaxWidth = parseInt(value);

								setFormState((prevState) => ({ ...prevState, key: 'CUSTOM', maxWidth: newMaxWidth }));

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
							onChange={(_e, preventScalingUp) => {
								setFormState((prevState) => ({
									...prevState,
									key: 'CUSTOM',
									maxWidth: preventScalingUp ? image?.naturalWidth ?? undefined : maxWidth,
									preventScalingUp
								}));
							}}
							onText="On"
						/>
					</div>
				</Fieldset>

				<hr />

				<Fieldset>
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
							onChange={(_e, crop) => {
								setFormState((prevState) => ({ ...prevState, key: 'CUSTOM', crop }));
							}}
							onText="On"
						/>

						<Toggle
							checked={formState.lockAspectRatio}
							disabled={isDownloading || !formState.crop}
							label="Lock aspect ratio?"
							offText="Off"
							onChange={(_e, lockAspectRatio) => {
								setFormState((prevState) => ({
									...prevState,
									aspectRatioHeight: prevState.aspectRatioHeight ?? 1,
									aspectRatioWidth: prevState.aspectRatioWidth ?? 1,
									key: 'CUSTOM',
									lockAspectRatio
								}));
							}}
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

								setFormState((prevState) => ({ ...prevState, aspectRatioWidth, key: 'CUSTOM' }));
							}}
							onDecrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value), key: 'CUSTOM' }));
							}}
							onIncrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value), key: 'CUSTOM' }));
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

								setFormState((prevState) => ({ ...prevState, aspectRatioHeight, key: 'CUSTOM' }));
							}}
							onDecrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioHeight: parseFloat(value), key: 'CUSTOM' }));
							}}
							onIncrement={(value) => {
								setFormState((prevState) => ({ ...prevState, aspectRatioHeight: parseFloat(value), key: 'CUSTOM' }));
							}}
							step={0.1}
							value={aspectRatioHeightValue}
						/>
					</div>
				</Fieldset>

				<hr />

				<Fieldset>
					<ChoiceGroup
						disabled={isDownloading}
						label="Image format"
						selectedKey={formState.format}
						options={IMAGE_FORMAT_OPTIONS}
						onChange={(_e, option) => {
							const format = option.key;

							setFormState((prevState) => ({ ...prevState, format, key: 'CUSTOM' }));
						}}
					/>
				</Fieldset>
			</div>

			<div
				css={{
					backgroundColor: theme.colors.white,
					borderRight: `1px solid ${theme.colors.neutralLight}`,
					borderTop: `1px solid ${theme.colors.neutralLight}`,
					bottom: 0,
					label: 'footer',
					left: 0,
					paddingBottom: theme.space[3],
					paddingTop: theme.space[3],
					position: 'fixed',
					width: 320
				}}
			>
				<div
					css={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<PrimaryButton
						disabled={isDownloading || !image?.currentSrc}
						iconProps={{
							iconName: 'Download'
						}}
						onClick={onSubmit}
					>
						Download resized image
					</PrimaryButton>
				</div>

				{children}
			</div>
		</form>
	);
};

ImageResizerForm.displayName = 'ImageResizerForm';
