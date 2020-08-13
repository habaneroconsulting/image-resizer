/** @jsx jsx */

import { jsx } from '@emotion/core';

import Dropzone, { DropzoneOptions } from 'react-dropzone';

import { useTheme } from 'Theme/use-theme';
import { DropzonePlaceholder } from './DropzonePlaceholder';

type DropzoneContainerProps = Pick<DropzoneOptions, 'onDropAccepted'>;

/**
 * Displays the dashed bordered area where files can be dragged into. A button
 * can also be clicked on to pop up the file picker.
 */
export const DropzoneContainer = ({ onDropAccepted }: DropzoneContainerProps) => {
	const theme = useTheme();

	return (
		<Dropzone accept=".bmp,.gif,.jpeg,.jpg,.png,.tiff" multiple={false} onDropAccepted={onDropAccepted}>
			{({ getRootProps, getInputProps, isDragActive }) => (
				<div
					css={{
						alignItems: 'center',
						backgroundColor: isDragActive ? theme.colors.white : theme.colors.disabledBackground,
						border: `1px dashed`,
						borderColor: isDragActive ? theme.colors.themePrimary : theme.colors.neutralDark,
						cursor: 'pointer',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						height: '100%',
						padding: theme.space[4],
						textAlign: 'center',
						width: '100%'
					}}
					{...getRootProps()}
				>
					<input {...getInputProps()} />

					{isDragActive ? <p>Drop the file here...</p> : <DropzonePlaceholder />}
				</div>
			)}
		</Dropzone>
	);
};

DropzoneContainer.displayName = 'DropzoneContainer';
