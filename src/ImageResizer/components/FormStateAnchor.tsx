/** @jsxImportSource @emotion/react */

import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { useTheme } from '@emotion/react';
import { FormState } from 'ImageResizer/types';
import { useState } from 'react';

import { DEFAULT_ID } from '../../constants';

type FormStateAnchorProps = {
	formState: FormState;
};

export const FormStateAnchor = ({ formState }: FormStateAnchorProps) => {
	const theme = useTheme();

	const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);

	const params = new URLSearchParams();

	if (formState.id !== DEFAULT_ID) {
		params.append('id', formState.id);
	} else {
		if (formState.aspectRatioHeight) {
			params.append('ar-h', formState.aspectRatioHeight.toString());
		}

		if (formState.aspectRatioWidth) {
			params.append('ar-w', formState.aspectRatioWidth.toString());
		}

		if (formState.lockAspectRatio) {
			params.append('lock-aspect-ratio', formState.lockAspectRatio.toString());
		}

		if (formState.maxWidth) {
			params.append('max-w', formState.maxWidth.toString());
		}

		if (formState.preventScalingUp) {
			params.append('prevent-scaling-up', formState.preventScalingUp.toString());
		}
	}

	if (formState.format) {
		params.append('format', formState.format);
	}

	if (formState.optimize) {
		params.append('optimize', formState.optimize.toString());
	}

	const port = window.location.port ? `:${window.location.port}` : '';
	const href = `${window.location.protocol}//${window.location.hostname}${port}/image-resizer?${params.toString()}`;

	return (
		<TooltipHost closeDelay={300} content={tooltipTimeout ? 'Copied to clipboard!' : undefined}>
			<a
				css={{
					fontSize: theme.fontSizes[2]
				}}
				href={href}
				onClick={(e) => {
					e.preventDefault();

					navigator.clipboard.writeText(href);

					clearTimeout(tooltipTimeout);

					const id = setTimeout(() => {
						setTooltipTimeout(null);
					}, 2500);

					setTooltipTimeout(id);
				}}
			>
				Save options to a URL
			</a>
		</TooltipHost>
	);
};

FormStateAnchor.displayName = 'FormStateAnchor';
