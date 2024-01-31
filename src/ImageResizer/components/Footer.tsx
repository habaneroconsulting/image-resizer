/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

type FooterProps = React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>;

export const Footer = (props: FooterProps) => {
	const theme = useTheme();

	return (
		<footer
			css={{
				marginTop: theme.space[3]
			}}
			{...props}
		>
			<p
				css={{
					fontSize: theme.fontSizes[1],
					marginBottom: 0,
					textAlign: 'center'
				}}
			>
				by{' '}
				<a href="https://www.habaneroconsulting.com" rel="noopener noreferrer" target="_blank">
					Habanero
				</a>{' '}
				| <Link to="/image-resizer/documentation">Documentation</Link> |{' '}
				<a href="https://github.com/habaneroconsulting/image-resizer" rel="noopener">
					GitHub
				</a>
			</p>
		</footer>
	);
};

Footer.displayName = 'Footer';
