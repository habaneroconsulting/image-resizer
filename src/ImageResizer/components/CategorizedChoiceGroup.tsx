/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { Label } from '@fluentui/react/lib/Label';
import { ChangeEvent, Fragment } from 'react';

type CategorizedChoiceOption = {
	aspectRatioHeight?: number;
	aspectRatioWidth?: number;
	aspectRatioLabel?: string;
	key: string;
	text: string;
};

type CategorizedChoiceGroupOptions = {
	label?: string;
	options: CategorizedChoiceOption[];
};

type CategorizedChoiceGroupProps = {
	groups: CategorizedChoiceGroupOptions[];
	label: string;
	name: string;
	onChange: (event: ChangeEvent, option: CategorizedChoiceOption) => void;
	value: string;
};

export const CategorizedChoiceGroup = ({ groups, label, name, onChange, value }: CategorizedChoiceGroupProps) => {
	const theme = useTheme();

	if (!groups) {
		return;
	}

	return (
		<Fragment>
			<legend
				css={{
					fontSize: 14,
					fontWeight: 'bold'
				}}
			>
				{label}
			</legend>

			{groups
				.filter((group) => group.options.length > 0)
				.map((group) => {
					return (
						<div
							css={{
								marginTop: theme.space[3]
							}}
						>
							{group.label && <Label>{group.label}</Label>}

							<div
								css={{
									display: 'grid',
									gap: theme.space[2],
									gridTemplateColumns: 'repeat(3, 1fr)'
								}}
							>
								{group.options.map((option) => {
									const isChecked = option.key === value;
									const isLandscape = option.aspectRatioWidth >= option.aspectRatioHeight;

									const height = isLandscape
										? `${(option.aspectRatioHeight / option.aspectRatioWidth) * 100}%`
										: '100%';
									const width = isLandscape ? '100%' : `${(option.aspectRatioHeight / option.aspectRatioWidth) * 100}%`;

									return (
										<label
											css={{
												backgroundColor: theme.colors.neutralLighterAlt,
												border: '1px solid transparent',
												cursor: 'pointer',
												display: 'flex',
												flexDirection: 'column',
												fontSize: theme.fontSizes[1],
												height: 90,
												justifyContent: 'center',
												lineHeight: theme.lineHeights.heading,
												padding: theme.space[2],
												position: 'relative',
												textAlign: 'center',
												transitionDuration: '200ms',
												transitionProperty: 'all',
												transitionTimingFunction: 'ease',

												'&:hover, &:focus-within': {
													backgroundColor: theme.colors.neutralLighter,
													borderColor: theme.colors.neutralSecondary,

													input: {
														opacity: 1
													}
												}
											}}
											style={{
												borderColor: isChecked ? theme.colors.themePrimary : undefined
											}}
										>
											<input
												checked={isChecked}
												css={{
													opacity: 0,
													position: 'absolute',
													right: theme.space[1],
													top: theme.space[1],
													transitionDuration: '200ms',
													transitionProperty: 'all',
													transitionTimingFunction: 'ease',

													'&:hover, &:focus': {
														opacity: 1
													},

													'&:focus': {
														outlineColor: theme.colors.themePrimary
													}
												}}
												name={name}
												onChange={(e) => onChange(e, option)}
												style={{
													opacity: isChecked ? 1 : undefined
												}}
												type="radio"
												value={option.key}
											/>

											{option.aspectRatioWidth && option.aspectRatioHeight && (
												<div
													css={{
														alignItems: 'center',
														display: 'flex',
														flexGrow: 1,
														justifyContent: 'center',
														marginBottom: theme.space[2]
													}}
													role="presentation"
												>
													<div
														css={{
															alignItems: 'center',
															display: 'flex',
															justifyContent: 'center'
														}}
														style={{
															backgroundColor: isChecked ? theme.colors.themePrimary : theme.colors.neutralLight,
															color: isChecked ? theme.colors.white : undefined,
															height,
															width
														}}
													>
														{option.aspectRatioWidth}x{option.aspectRatioHeight}
													</div>
												</div>
											)}

											<span>{option.text}</span>
										</label>
									);
								})}
							</div>
						</div>
					);
				})}
		</Fragment>
	);
};

CategorizedChoiceGroup.displayName = 'CategorizedChoiceGroup';
