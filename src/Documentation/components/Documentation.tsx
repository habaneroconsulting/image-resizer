/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

export const Documentation = () => {
	const theme = useTheme();

	return (
		<div
			css={{
				marginLeft: 'auto',
				marginRight: 'auto',
				maxWidth: '50rem'
			}}
		>
			<p
				css={{
					textAlign: 'center'
				}}
			>
				<Link to="/image-resizer">Return to resizer</Link>
			</p>

			<h1
				css={{
					marginTop: theme.space[7]
				}}
			>
				Documentation
			</h1>

			<p>
				This app resizes images to a specific maximum width and aspect ratio. It is to help content authors generate
				correctly sized images when their authoring tools may not support image editing. Links to this app can be
				generated with special query strings that fill out the various form options.
			</p>

			<h2>Query string options</h2>

			<ul>
				<li>
					<b>max-w</b> <code>[number]</code>: Sets the maximum width of the image.
				</li>
				<li>
					<b>ar-w</b> <code>[number]</code>: Sets the aspect ratio width.
				</li>
				<li>
					<b>ar-h</b> <code>[number]</code>: Sets the aspect ratio height.
				</li>
				<li>
					<b>format</b> <code>['jpg'|'png']</code>: Sets the format of the image.
				</li>
				<li>
					<b>optimize</b> <code>['true'|'false']</code>: Sets whether or not the image should be optimized after
					resizing, using either <i>mozjpeg</i> or <i>optipng</i>.
				</li>
			</ul>
		</div>
	);
};

Documentation.displayName = 'Documentation';
