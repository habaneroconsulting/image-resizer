/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import React from 'react';

import { PrimaryButton } from '@fluentui/react/lib/Button';

/**
 * Content to be shown before the dropzone area is being used. Not shown when
 * the dropzone is active (i.e. when a user is dragging a file).
 */
export const DropzonePlaceholder = () => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<svg
				css={{
					marginBottom: theme.space[2]
				}}
				width="27"
				height="43"
				viewBox="0 0 27 43"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M25.25 0V2.6875H1.0625V0H25.25ZM26.1948 20.5552L24.3052 22.4448L14.5 12.5767V43H11.8125V12.5767L2.00732 22.4448L0.117676 20.5552L13.1562 7.41162L26.1948 20.5552Z"
					fill="currentColor"
				/>
			</svg>

			<div
				css={{
					fontSize: theme.fontSizes[5],
					marginBottom: theme.space[2]
				}}
			>
				Drag a photo here
			</div>
			<div
				css={{
					fontSize: theme.fontSizes[5],
					marginBottom: theme.space[2]
				}}
			>
				or
			</div>

			<PrimaryButton>Select one from your device</PrimaryButton>
		</React.Fragment>
	);
};

DropzonePlaceholder.displayName = 'DropzonePlaceholder';
