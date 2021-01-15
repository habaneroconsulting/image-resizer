/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { Label } from '@fluentui/react/lib/Label';
import { ChangeEvent, Fragment } from 'react';

type CategorizedChoiceOption = {
	aspectRatioHeight?: number;
	aspectRatioWidth?: number;
	id: string;
	text: string;
};

type CategorizedChoiceOptionProps = CategorizedChoiceOption &
	Pick<CategorizedChoiceGroupProps, 'disabled' | 'name' | 'onChange' | 'value'>;

type CategorizedChoiceGroupOptions = {
	label?: string;
	options: CategorizedChoiceOption[];
};

type CategorizedChoiceGroupProps = {
	disabled?: boolean;
	groups: CategorizedChoiceGroupOptions[];
	name: string;
	onChange: (event: ChangeEvent, option: CategorizedChoiceOption) => void;
	value: string;
};

const CategorizedChoiceOptionElement = ({
	disabled,
	name,
	onChange,
	value,
	...option
}: CategorizedChoiceOptionProps) => {
	const theme = useTheme();

	const isChecked = option.id === value;
	const isLandscape = option.aspectRatioWidth > option.aspectRatioHeight;

	const height = isLandscape ? `${(option.aspectRatioHeight / option.aspectRatioWidth) * 100}%` : '100%';
	const width = isLandscape ? '100%' : `${(option.aspectRatioHeight / option.aspectRatioWidth) * 100}%`;

	return (
		<label
			css={{
				alignItems: 'center',
				backgroundColor: theme.colors.neutralLighterAlt,
				border: '1px solid',
				borderColor: isChecked ? theme.colors.themePrimary : 'transparent',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				fontSize: theme.fontSizes[1],
				height: 130,
				justifyContent: 'center',
				lineHeight: theme.lineHeights.heading,
				padding: theme.space[3],
				paddingBottom: theme.space[2],
				position: 'relative',
				textAlign: 'center',
				transitionDuration: '200ms',
				transitionProperty: 'all',
				transitionTimingFunction: 'ease',

				'&:hover, &:focus-within': {
					backgroundColor: disabled ? undefined : theme.colors.neutralLighter,
					borderColor: isChecked ? theme.colors.themePrimary : theme.colors.neutralSecondary,

					'[class*="input"]': {
						opacity: 1
					}
				}
			}}
		>
			<div
				css={{
					backgroundColor: theme.colors.white,
					border: `1px solid ${theme.colors.neutralSecondary}`,
					borderRadius: '50%',
					label: 'input',
					height: 16,
					opacity: isChecked ? 1 : 0,
					position: 'absolute',
					right: theme.space[1],
					top: theme.space[1],
					transitionDuration: '200ms',
					transitionProperty: 'all',
					transitionTimingFunction: 'ease',
					width: 16,

					'&:hover, &:focus': {
						opacity: disabled ? 0 : 1
					},

					'&:focus': {
						outlineColor: theme.colors.themePrimary
					},

					'::before': {
						backgroundColor: theme.colors.themePrimary,
						borderRadius: '50%',
						content: '""',
						display: isChecked ? 'block' : 'none',
						height: 8,
						left: 3,
						position: 'absolute',
						top: 3,
						width: 8
					}
				}}
				role="presentation"
			/>

			<input
				checked={isChecked}
				css={{
					opacity: 0,
					position: 'absolute'
				}}
				disabled={disabled}
				name={name}
				onChange={(e) => {
					onChange(e, option);
				}}
				type="radio"
				value={option.id}
			/>

			{option.aspectRatioWidth && option.aspectRatioHeight && (
				<div
					css={{
						alignItems: 'center',
						display: 'flex',
						flexGrow: 1,
						justifyContent: 'center',
						marginBottom: theme.space[3],
						width: isLandscape ? 100 : 84
					}}
					role="presentation"
				>
					<div
						css={{
							alignItems: 'center',
							boxShadow: theme.shadows.depth8,
							display: 'flex',
							fontSize: theme.fontSizes[0],
							justifyContent: 'center',
							label: 'aspect-ratio-preview'
						}}
						style={{
							backgroundColor: isChecked ? theme.colors.themePrimary : theme.colors.neutralLight,
							color: isChecked ? theme.colors.white : undefined,
							height,
							width
						}}
					>
						{option.aspectRatioWidth} x {option.aspectRatioHeight}
					</div>
				</div>
			)}

			<span>{option.text}</span>
		</label>
	);
};

export const CategorizedChoiceGroup = ({
	disabled = false,
	groups,
	name,
	onChange,
	value
}: CategorizedChoiceGroupProps) => {
	const theme = useTheme();

	if (!groups) {
		return;
	}

	return (
		<Fragment>
			{groups
				.filter((group) => group.options.length > 0)
				.map((group, groupIndex) => {
					return (
						<div
							css={{
								marginTop: groupIndex === 0 ? 0 : theme.space[3]
							}}
							key={`group-key-${groupIndex}`}
						>
							{group.label && <Label>{group.label}</Label>}

							<div
								css={{
									display: 'grid',
									gap: theme.space[2],
									gridTemplateColumns: 'repeat(2, 1fr)'
								}}
							>
								{group.options.map((option, optionIndex) => (
									<CategorizedChoiceOptionElement
										{...option}
										disabled={disabled}
										key={`group-${groupIndex}-option-key-${optionIndex}`}
										name={name}
										onChange={onChange}
										value={value}
									/>
								))}
							</div>
						</div>
					);
				})}
		</Fragment>
	);
};

CategorizedChoiceGroup.displayName = 'CategorizedChoiceGroup';
