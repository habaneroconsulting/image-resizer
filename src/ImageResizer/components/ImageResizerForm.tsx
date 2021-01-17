/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
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
import { SpinButtonContainer } from './SpinButtonContainer';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

type ImageResizerFormProps = {
	isDownloading?: boolean;
	image?: HTMLImageElement;
	formState: FormState;
	onSubmit: () => any;
	setFormState: Dispatch<SetStateAction<FormState>>;
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

	const aspectRatioDisabled = !formState.lockAspectRatio;
	const aspectRatioHeightValue = aspectRatioDisabled ? '' : formState.aspectRatioHeight?.toString() ?? '1';
	const aspectRatioWidthValue = aspectRatioDisabled ? '' : formState.aspectRatioWidth?.toString() ?? '1';

	const isCustom = formState.id === 'CUSTOM';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				onSubmit();
			}}
		>
			<Fieldset legend="Custom" isExpanded={isCustom}>
				<div
					css={{
						display: 'grid',
						gridGap: theme.space[4],
						gridTemplateColumns: '105px 105px 1fr',
						marginBottom: theme.space[3]
					}}
				>
					<TooltipHost content="Units wide">
						<label
							aria-label="Aspect ratio units wide"
							css={{
								display: 'flex',
								lineHeight: '32px'
							}}
						>
							<span
								css={{
									fontSize: theme.fontSizes[2],
									marginRight: theme.space[2],
									opacity: aspectRatioDisabled ? 0.5 : undefined
								}}
								role="presentation"
							>
								w
							</span>
							<SpinButtonContainer
								disabled={isDownloading || aspectRatioDisabled}
								max={Infinity}
								min={0.1}
								onBlur={(e) => {
									const value = e.currentTarget.value;
									let aspectRatioWidth = parseFloat(parseFloat(value).toFixed(1));

									if (isNaN(aspectRatioWidth)) {
										aspectRatioWidth = DEFAULT_ASPECT_RATIO_WIDTH;
									}

									setFormState((prevState) => ({ ...prevState, aspectRatioWidth, id: 'CUSTOM' }));
								}}
								onDecrement={(value) => {
									setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value), id: 'CUSTOM' }));
								}}
								onIncrement={(value) => {
									setFormState((prevState) => ({ ...prevState, aspectRatioWidth: parseFloat(value), id: 'CUSTOM' }));
								}}
								step={1}
								value={aspectRatioWidthValue}
							/>
						</label>
					</TooltipHost>

					<TooltipHost content="Units high">
						<label
							aria-label="Aspect ratio units high"
							css={{
								display: 'flex',
								lineHeight: '32px'
							}}
						>
							<span
								css={{
									fontSize: theme.fontSizes[2],
									marginRight: theme.space[2],
									opacity: aspectRatioDisabled ? 0.5 : undefined
								}}
								role="presentation"
							>
								h
							</span>
							<SpinButtonContainer
								disabled={isDownloading || aspectRatioDisabled}
								max={Infinity}
								onBlur={(e) => {
									const value = e.currentTarget.value;
									let aspectRatioHeight = parseFloat(parseFloat(value).toFixed(1));

									if (isNaN(aspectRatioHeight)) {
										aspectRatioHeight = DEFAULT_ASPECT_RATIO_HEIGHT;
									}

									setFormState((prevState) => ({ ...prevState, aspectRatioHeight, id: 'CUSTOM' }));
								}}
								onDecrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioHeight: parseFloat(value),
										id: 'CUSTOM'
									}));
								}}
								onIncrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioHeight: parseFloat(value),
										id: 'CUSTOM'
									}));
								}}
								step={1}
								value={aspectRatioHeightValue}
							/>
						</label>
					</TooltipHost>

					<TooltipHost content="Lock aspect ratio">
						<IconButton
							ariaLabel="Toggle aspect ratio lock"
							checked={formState.lockAspectRatio}
							iconProps={{ iconName: formState.lockAspectRatio ? 'Lock' : 'Unlock' }}
							onClick={() => {
								setFormState((prevState) => ({
									...prevState,
									id: 'CUSTOM',
									lockAspectRatio: !prevState.lockAspectRatio
								}));
							}}
						/>
					</TooltipHost>
				</div>

				<div
					css={{
						display: 'grid',
						gridGap: theme.space[4],
						gridTemplateColumns: '105px 1fr'
					}}
				>
					<SpinButtonContainer
						disabled={isDownloading}
						label={'Output width'}
						max={maxWidth}
						onBlur={(e) => {
							let value = e.currentTarget.value;

							if (value === Infinity.toString()) {
								value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
							}

							const newMaxWidth = parseInt(value);

							setFormState((prevState) => ({ ...prevState, id: 'CUSTOM', maxWidth: newMaxWidth }));
						}}
						onDecrement={(value) => {
							if (value === Infinity.toString()) {
								value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
							}

							const newMaxWidth = parseInt(value);

							setFormState((prevState) => ({ ...prevState, id: 'CUSTOM', maxWidth: newMaxWidth }));

							return `${newMaxWidth} px`;
						}}
						onIncrement={(value) => {
							if (value === Infinity.toString()) {
								value = image?.naturalWidth.toString() ?? DEFAULT_MAX_WIDTH.toString();
							}

							const newMaxWidth = parseInt(value);

							setFormState((prevState) => ({ ...prevState, id: 'CUSTOM', maxWidth: newMaxWidth }));

							return `${newMaxWidth} px`;
						}}
						step={1}
						value={maxWidth === Infinity || isNaN(maxWidth) ? '' : `${maxWidth} px`}
					/>

					<Toggle
						checked={formState.preventScalingUp}
						disabled={isDownloading}
						label="Prevent scaling up"
						offText="Off"
						onChange={(_e, preventScalingUp) => {
							setFormState((prevState) => ({
								...prevState,
								id: 'CUSTOM',
								maxWidth: preventScalingUp ? image?.naturalWidth ?? undefined : maxWidth,
								preventScalingUp
							}));
						}}
						onText="On"
					/>
				</div>
			</Fieldset>

			<Fieldset legend="Presets" isExpanded={!isCustom}>
				<CategorizedChoiceGroup
					name="presets"
					onChange={(_e, option) => {
						// Set presets on top of previous state.
						setFormState((prevState) => ({ ...prevState, ...option }));
					}}
					groups={[
						{
							label: 'Facebook',
							options: [
								PRESET_OPTIONS.FACEBOOK_COVER_PHOTO,
								PRESET_OPTIONS.FACEBOOK_POST,
								PRESET_OPTIONS.FACEBOOK_SQUARE_POST
							]
						},
						{
							label: 'Twitter',
							options: [PRESET_OPTIONS.TWITTER_HEADER_PHOTO, PRESET_OPTIONS.TWITTER_POST]
						},
						{
							label: 'LinkedIn',
							options: [PRESET_OPTIONS.LINKEDIN_COVER_PHOTO, PRESET_OPTIONS.LINKEDIN_POST]
						},
						{
							label: 'Instagram',
							options: []
						}
					]}
					value={formState.id}
				/>
			</Fieldset>

			<Fieldset legend="Advanced">
				<div
					css={{
						display: 'grid',
						gridGap: theme.space[3],
						gridTemplateColumns: '1fr'
					}}
				>
					<Dropdown
						disabled={isDownloading}
						label="Image format"
						selectedKey={formState.format}
						options={IMAGE_FORMAT_OPTIONS}
						onChange={(_e, option) => {
							setFormState((prevState) => ({ ...prevState, format: option.key.toString() }));
						}}
					/>

					<Toggle
						checked={formState.optimize}
						disabled={isDownloading}
						label="Optimize image"
						offText="Off"
						onChange={(_e, optimize) => {
							setFormState((prevState) => ({
								...prevState,
								optimize
							}));
						}}
						onText="On"
					/>
				</div>
			</Fieldset>

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
							iconName: isDownloading ? undefined : 'Download'
						}}
						type="submit"
					>
						{isDownloading && <Spinner size={SpinnerSize.xSmall} />}

						{/* Adding a <Spinner> above removes the label from the text below. */}
						<span css={{ fontWeight: theme.fontWeights.semibold, marginLeft: theme.space[2] }}>
							Download resized image
						</span>
					</PrimaryButton>
				</div>
			</div>
		</form>
	);
};

ImageResizerForm.displayName = 'ImageResizerForm';
