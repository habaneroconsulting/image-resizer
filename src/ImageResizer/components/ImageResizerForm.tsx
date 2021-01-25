/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Dispatch, SetStateAction, useEffect } from 'react';

import {
	DEFAULT_ASPECT_RATIO_HEIGHT,
	DEFAULT_ASPECT_RATIO_WIDTH,
	CUSTOM_ID,
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

	const aspectRatioDisabled = false;
	const aspectRatioHeightValue = isNaN(formState.aspectRatioHeight)
		? ''
		: formState.aspectRatioHeight?.toString() ?? '1';
	const aspectRatioWidthValue = isNaN(formState.aspectRatioWidth) ? '' : formState.aspectRatioWidth?.toString() ?? '1';

	// Change URL to match form state.
	useEffect(() => {
		const params = new URLSearchParams();

		if (formState.id !== CUSTOM_ID) {
			params.append('id', formState.id);
		} else {
			if (formState.aspectRatioHeight) {
				params.append('ar-h', formState.aspectRatioHeight.toString());
			}

			if (formState.aspectRatioWidth) {
				params.append('ar-w', formState.aspectRatioWidth.toString());
			}

			if (formState.lockAspectRatio) {
				params.append('lock-aspect-ratio', formState.lockAspectRatio.toString());
			}

			if (formState.maxWidth) {
				params.append('max-w', formState.maxWidth.toString());
			}
		}

		if (formState.format) {
			params.append('format', formState.format);
		}

		if (formState.optimize) {
			params.append('optimize', formState.optimize.toString());
		}

		const port = window.location.port ? `:${window.location.port}` : '';
		const href = `${window.location.protocol}//${window.location.hostname}${port}/image-resizer?${params.toString()}`;

		window.history.replaceState(null, null, href);
	}, [formState]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				onSubmit();
			}}
		>
			<Fieldset legend="Presets" isExpanded={formState.id !== CUSTOM_ID}>
				<CategorizedChoiceGroup
					name="presets"
					onChange={(_e, option) => {
						// Set presets on top of previous state.
						setFormState((prevState) => ({ ...prevState, ...option, change: 'input' }));
					}}
					groups={[
						{
							label: 'Common',
							options: [PRESET_OPTIONS.opengraph, PRESET_OPTIONS.hd720, PRESET_OPTIONS.hd1080, PRESET_OPTIONS.uhd]
						},
						{
							label: 'Facebook',
							options: [
								PRESET_OPTIONS.facebook_cover_photo,
								PRESET_OPTIONS.facebook_post,
								PRESET_OPTIONS.facebook_square_post
							]
						},
						{
							label: 'Instagram',
							options: [
								PRESET_OPTIONS.instagram_square_post,
								PRESET_OPTIONS.instagram_landscape_post,
								PRESET_OPTIONS.instagram_portrait_post,
								PRESET_OPTIONS.instagram_story
							]
						},
						{
							label: 'LinkedIn',
							options: [PRESET_OPTIONS.linkedin_cover_photo, PRESET_OPTIONS.linkedin_post]
						},
						{
							label: 'Twitter',
							options: [PRESET_OPTIONS.twitter_header_photo, PRESET_OPTIONS.twitter_post]
						},
						{
							label: 'Microsoft 365',
							options: [PRESET_OPTIONS.sharepoint_tile, PRESET_OPTIONS.sharepoint_wide]
						}
					]}
					value={formState.id}
				/>
			</Fieldset>

			<Fieldset legend="Custom ratio" isExpanded={formState.id === CUSTOM_ID}>
				<div
					css={{
						display: 'grid',
						gridGap: theme.space[4],
						gridTemplateColumns: '105px 105px 1fr'
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

									setFormState((prevState) => ({ ...prevState, aspectRatioWidth, change: 'input', id: CUSTOM_ID }));
								}}
								onDecrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioWidth: parseFloat(value),
										change: 'input',
										id: CUSTOM_ID
									}));
								}}
								onIncrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioWidth: parseFloat(value),
										change: 'input',
										id: CUSTOM_ID
									}));
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

									setFormState((prevState) => ({ ...prevState, change: 'input', aspectRatioHeight, id: CUSTOM_ID }));
								}}
								onDecrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioHeight: parseFloat(value),
										change: 'input',
										id: CUSTOM_ID
									}));
								}}
								onIncrement={(value) => {
									setFormState((prevState) => ({
										...prevState,
										aspectRatioHeight: parseFloat(value),
										change: 'input',
										id: CUSTOM_ID
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
									id: CUSTOM_ID,
									lockAspectRatio: !prevState.lockAspectRatio
								}));
							}}
						/>
					</TooltipHost>
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
					padding: theme.space[3],
					position: 'fixed',
					width: 320
				}}
			>
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

					<div
						css={{
							display: 'grid',
							gridGap: theme.space[3],
							gridTemplateColumns: '1fr 1fr'
						}}
					>
						<div
							css={{
								display: 'grid',
								gridGap: theme.space[4],
								gridTemplateColumns: '105px 1fr'
							}}
						>
							<SpinButtonContainer
								disabled={isDownloading}
								label={'Export width'}
								max={formState.maxWidth}
								onBlur={(e) => {
									let value = e.currentTarget.value;

									if (value === Infinity.toString()) {
										value = image?.naturalWidth.toString();
									}

									const newMaxWidth = parseInt(value);

									setFormState((prevState) => ({ ...prevState, id: CUSTOM_ID, maxWidth: newMaxWidth }));
								}}
								onDecrement={(value) => {
									if (value === Infinity.toString()) {
										value = image?.naturalWidth.toString();
									}

									const newMaxWidth = parseInt(value);

									setFormState((prevState) => ({ ...prevState, id: CUSTOM_ID, maxWidth: newMaxWidth }));

									return `${newMaxWidth} px`;
								}}
								onIncrement={(value) => {
									if (value === Infinity.toString()) {
										value = image?.naturalWidth.toString();
									}

									const newMaxWidth = parseInt(value);

									setFormState((prevState) => ({ ...prevState, id: CUSTOM_ID, maxWidth: newMaxWidth }));

									return `${newMaxWidth} px`;
								}}
								step={1}
								value={formState.maxWidth === Infinity || isNaN(formState.maxWidth) ? '' : `${formState.maxWidth} px`}
							/>
						</div>

						<Toggle
							checked={formState.optimize}
							disabled={isDownloading || !IMAGE_FORMAT_OPTIONS.find((o) => o.key === formState.format)?.optimize}
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

					<TooltipHost
						calloutProps={{
							calloutMaxWidth: 212,
							styles: {
								root: {
									textAlign: 'center'
								}
							}
						}}
						content={
							// Show tooltip only when we're optimizing the image.
							isDownloading && formState.optimize
								? 'Hey! Your image is pretty big. This may take a little bit to process.'
								: ''
						}
					>
						<PrimaryButton
							disabled={isDownloading || !image?.currentSrc}
							iconProps={{
								iconName: isDownloading ? undefined : 'Download'
							}}
							type="submit"
							styles={{
								root: {
									width: '100%'
								}
							}}
						>
							{isDownloading && <Spinner size={SpinnerSize.xSmall} />}

							{/* Adding a <Spinner> above removes the label from the text below. */}
							<span css={{ fontWeight: theme.fontWeights.semibold, marginLeft: theme.space[2] }}>Download image</span>
						</PrimaryButton>
					</TooltipHost>
				</div>
			</div>
		</form>
	);
};

ImageResizerForm.displayName = 'ImageResizerForm';
