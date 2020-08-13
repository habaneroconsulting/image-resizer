/** @jsx jsx */

import { jsx } from '@emotion/core';
import React from 'react';

import { Link } from 'react-router-dom';

import { useTheme } from 'Theme/use-theme';

type FooterProps = {
	children?: React.ReactNode;
};

/**
 * Basic footer content.
 */
export const Footer = ({ children }: FooterProps) => {
	const theme = useTheme();

	return (
		<footer
			css={{
				textAlign: 'center'
			}}
		>
			{children}

			<p
				css={{
					fontSize: theme.fontSizes[2]
				}}
			>
				Made by
				<br />
				<a href="https://www.habaneroconsulting.com" rel="noopener noreferrer" target="_blank">
					Habanero Consulting Group
				</a>
			</p>

			<p
				css={{
					fontSize: theme.fontSizes[2]
				}}
			>
				<Link to="/image-resizer/documentation">Documentation</Link>
			</p>
		</footer>
	);
};

Footer.displayName = 'Footer';
