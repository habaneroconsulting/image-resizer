/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

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
						fontSize: theme.fontSizes[4],
						margin: 0
					}}
				>
					Image resizer
				</h1>

				<p
					css={{
						fontSize: theme.fontSizes[1],
						marginBottom: 0,
						marginTop: theme.space[1]
					}}
				>
					by{' '}
					<a href="https://www.habaneroconsulting.com" rel="noopener noreferrer" target="_blank">
						Habanero Consulting Group
					</a>{' '}
					| <Link to="/image-resizer/documentation">Documentation</Link>
				</p>
			</div>

			{children}
		</header>
	);
};

Header.displayName = 'Logo';
