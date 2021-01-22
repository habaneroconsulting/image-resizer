/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import React from 'react';

import { ReactComponent as LogoSvg } from '../logo.svg';

type HeaderProps = {
	children?: React.ReactNode;
};

/**
 * Basic header content.
 */
export const Header = ({ children }: HeaderProps) => {
	const theme = useTheme();

	return (
		<header
			css={{
				alignItems: 'center',
				display: 'flex',
				marginBottom: theme.space[3],
				paddingLeft: theme.space[3]
			}}
		>
			<div>
				<LogoSvg
					css={{
						display: 'block'
					}}
				/>
			</div>

			<div
				css={{
					marginLeft: theme.space[3]
				}}
			>
				<h1
					css={{
						fontSize: theme.fontSizes[6],
						margin: 0
					}}
				>
					Habasizer
				</h1>
			</div>

			{children}
		</header>
	);
};

Header.displayName = 'Logo';
