/** @jsx jsx */

import { Global, jsx } from '@emotion/core';
import { registerIcons } from '@fluentui/react/lib/Styling';

import { useTheme } from '../use-theme';

registerIcons({
	icons: {
		ChevronDownSmall: (
			<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M7.02734 0.363281L7.97266 1.30469L4 5.27734L0.0273438 1.30469L0.972656 0.363281L4 3.39062L7.02734 0.363281Z"
					fill="currentColor"
				/>
			</svg>
		),
		ChevronUpSmall: (
			<svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 0.722656L7.97266 4.69531L7.02734 5.63672L4 2.60938L0.972656 5.63672L0.0273438 4.69531L4 0.722656Z"
					fill="currentColor"
				/>
			</svg>
		),
		ClearSelection: (
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13.3828 7C13.7422 7 14.0807 7.07031 14.3984 7.21094C14.7161 7.34635 14.9922 7.53385 15.2266 7.77344C15.4661 8.00781 15.6536 8.28646 15.7891 8.60938C15.9297 8.92708 16 9.26562 16 9.625C16 9.96875 15.9349 10.3021 15.8047 10.625C15.6745 10.9427 15.4844 11.2266 15.2344 11.4766L11.7266 14.9766L11.0234 14.2734L14.5234 10.7656C14.6745 10.6146 14.7917 10.4401 14.875 10.2422C14.9583 10.0443 15 9.83854 15 9.625C15 9.40104 14.9557 9.19271 14.8672 9C14.7839 8.80208 14.6667 8.63021 14.5156 8.48438C14.3698 8.33333 14.1979 8.21615 14 8.13281C13.8073 8.04427 13.599 8 13.375 8C13.1615 8 12.9557 8.04167 12.7578 8.125C12.5599 8.20833 12.3854 8.32552 12.2344 8.47656L10.7109 10H12V11H9V8H10V9.28906C10.2448 9.04427 10.487 8.78646 10.7266 8.51562C10.9661 8.24479 11.2188 7.9974 11.4844 7.77344C11.7552 7.54948 12.0443 7.36458 12.3516 7.21875C12.6589 7.07292 13.0026 7 13.3828 7ZM14 6H13V5H14V6ZM14 4H13V3H14V4ZM14 2H13V1H14V2ZM12 2H11V1H12V2ZM10 2H9V1H10V2ZM7 1H8V2H7V1ZM5 1H6V2H5V1ZM3 1H4V2H3V1ZM1 1H2V2H1V1ZM1 3H2V4H1V3ZM1 5H2V6H1V5ZM1 7H2V8H1V7ZM1 9H2V10H1V9ZM1 11H2V12H1V11ZM1 13H2V14H1V13ZM3 13H4V14H3V13ZM5 13H6V14H5V13ZM7 13H8V14H7V13ZM9 13H10V14H9V13Z"
					fill="currentColor"
				/>
			</svg>
		),
		Download: (
			<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1 16V15H10V16H1ZM10.3516 8.35156L5.5 13.2422L0.648438 8.35156L1.35156 7.64844L5 11.3203V0H6V11.3203L9.64844 7.64844L10.3516 8.35156Z"
					fill="currentColor"
				/>
			</svg>
		),
		RemoveFilter: (
			<svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13 3H12V14.5C12 14.7083 11.9609 14.9036 11.8828 15.0859C11.8047 15.2682 11.6979 15.4271 11.5625 15.5625C11.4271 15.6979 11.2682 15.8047 11.0859 15.8828C10.9036 15.9609 10.7083 16 10.5 16H2.5C2.29167 16 2.09635 15.9609 1.91406 15.8828C1.73177 15.8047 1.57292 15.6979 1.4375 15.5625C1.30208 15.4271 1.19531 15.2682 1.11719 15.0859C1.03906 14.9036 1 14.7083 1 14.5V3H0V2H4V1C4 0.859375 4.02604 0.729167 4.07812 0.609375C4.13021 0.489583 4.20052 0.385417 4.28906 0.296875C4.38281 0.203125 4.48958 0.130208 4.60938 0.078125C4.72917 0.0260417 4.85938 0 5 0H8C8.14062 0 8.27083 0.0260417 8.39062 0.078125C8.51042 0.130208 8.61458 0.203125 8.70312 0.296875C8.79688 0.385417 8.86979 0.489583 8.92188 0.609375C8.97396 0.729167 9 0.859375 9 1V2H13V3ZM5 2H8V1H5V2ZM11 3H2V14.5C2 14.6354 2.04948 14.7526 2.14844 14.8516C2.2474 14.9505 2.36458 15 2.5 15H10.5C10.6354 15 10.7526 14.9505 10.8516 14.8516C10.9505 14.7526 11 14.6354 11 14.5V3ZM5 13H4V5H5V13ZM7 13H6V5H7V13ZM9 13H8V5H9V13Z"
					fill="currentColor"
				/>
			</svg>
		),
		Upload: (
			<svg width="27" height="43" viewBox="0 0 27 43" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M25.25 0V2.6875H1.0625V0H25.25ZM26.1948 20.5552L24.3052 22.4448L14.5 12.5767V43H11.8125V12.5767L2.00732 22.4448L0.117676 20.5552L13.1562 7.41162L26.1948 20.5552Z"
					fill="currentColor"
				/>
			</svg>
		)
	}
});

export const GlobalStyles = () => {
	const theme = useTheme();

	const checkeredSize = 20;

	return (
		<Global
			styles={{
				'*': {
					boxSizing: 'border-box',
					margin: 0,
					padding: 0,
					WebkitFontSmoothing: 'antialiased'
				},

				'html, body, #root': {
					height: '100%'
				},

				html: {
					color: theme.colors.bodyText,
					fontFamily: theme.fonts.body,
					fontSize: theme.fontSizes[3]
				},

				body: {
					lineHeight: theme.lineHeights.body,
					margin: 0
				},

				'.main': {
					maxWidth: '48rem',
					margin: '0 1rem',

					'@media (min-width: 48rem)': {
						margin: '0 auto'
					}
				},

				p: {
					margin: '1rem 0'
				},

				'h1, h2, h3, h4, h5, h6': {
					lineHeight: theme.lineHeights.heading
				},

				h1: {
					color: theme.colors.themePrimary,
					fontFamily: theme.fonts.body,
					fontSize: theme.fontSizes[8],
					fontWeight: 600,
					margin: '1rem 0 2rem 0',

					'@media (min-width: 768px)': {
						fontSize: theme.fontSizes[9]
					}
				},

				h2: {
					borderBottom: `1px solid ${theme.colors.neutralLight}`,
					color: theme.colors.neutralDark,
					fontFamily: theme.fonts.heading,
					fontSize: theme.fontSizes[5],
					fontWeight: 600,
					margin: '2rem 0 1rem 0',
					paddingBottom: theme.space[2],

					'@media (min-width: 768px)': {
						fontSize: theme.fontSizes[6],
						margin: '3rem 0 2rem 0'
					}
				},

				h3: {
					color: theme.colors.neutralDark,
					fontFamily: theme.fonts.heading,
					fontSize: theme.fontSizes[5],
					fontWeight: 'normal',
					margin: '1.25rem 0 1rem 0',

					'@media (min-width: 768px)': {
						fontSize: theme.fontSizes[6],
						margin: '2.5rem 0 1rem 0'
					}
				},

				a: {
					color: theme.colors.neutralPrimary,
					boxShadow: `inset 0 -1px 0 ${theme.colors.neutralLight}`,
					textDecoration: `none`,
					transition: `all 75ms ease-in`,

					'&, &:visited': {
						color: theme.colors.primaryText
					},

					'&:focus, &:hover': {
						boxShadow: `inset 0 -1px 0 ${theme.colors.neutralSecondary}`
					}
				},

				hr: {
					backgroundColor: theme.colors.neutralLight,
					border: 0,
					height: 1,
					margin: '1.5rem 0'
				},

				'ul:not([class])': {
					listStyle: 'none',
					margin: theme.space[3],
					marginLeft: '3rem',

					'li ul': {
						margin: '0 1rem 0 1.5rem'
					}
				},

				'li:not([class])': {
					lineHeight: 1.2,
					margin: '0.75rem 0',
					position: 'relative',

					'&:before': {
						backgroundColor: theme.colors.themePrimary,
						borderRadius: '50%',
						content: `""`,
						display: 'inline-block',
						height: 6,
						left: -20,
						position: 'absolute',
						top: 6,
						width: 6
					}
				},

				table: {
					borderCollapse: 'collapse',
					width: '100%',

					'tbody tr': {
						'&:nth-of-type(odd)': {
							backgroundColor: theme.colors.neutralLighterAlt
						}
					},

					'th, td': {
						fontSize: theme.fontSizes[1],
						padding: theme.space[1],
						textAlign: 'left',

						'@media (min-width: 768px)': {
							fontSize: theme.fontSizes[2],
							padding: theme.space[2]
						}
					}
				},

				img: {
					maxWidth: '100%'
				},

				'.ReactCrop': {
					display: 'block !important',
					maxHeight: '100%'
				},

				'.ReactCrop__image': {
					backgroundImage: `linear-gradient(45deg, ${theme.colors.neutralLight} 25%, transparent 25%),
						linear-gradient(45deg, transparent 75%, ${theme.colors.neutralLight} 75%),
						linear-gradient(45deg, transparent 75%, ${theme.colors.neutralLight} 75%),
						linear-gradient(45deg, ${theme.colors.neutralLight} 25%, transparent 25%)`,
					backgroundSize: `${checkeredSize}px ${checkeredSize}px`,
					backgroundPosition: `0 0,
						0 0,
						-${checkeredSize / 2}px -${checkeredSize / 2}px,
						${checkeredSize / 2}px ${checkeredSize / 2}px`,
					maxHeight: 'calc(100vh - 120px)'
				}
			}}
		/>
	);
};
