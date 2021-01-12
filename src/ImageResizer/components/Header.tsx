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
			<LogoSvg />

			<h1
				css={{
					fontSize: theme.fontSizes[4],
					margin: 0,
					marginLeft: theme.space[3]
				}}
			>
				Image resizer
			</h1>

			{children}
		</header>
	);
};

Header.displayName = 'Logo';
