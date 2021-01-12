/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';

type FieldsetProps = React.DetailedHTMLProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & {
	legend?: string;
};

/**
 * Common styles for fieldsets.
 */
export const Fieldset = ({ children }: FieldsetProps) => {
	const theme = useTheme();

	return (
		<fieldset
			css={{
				border: 0,
				paddingLeft: theme.space[3],
				paddingRight: theme.space[3]
			}}
		>
			{children}
		</fieldset>
	);
};

Fieldset.displayName = 'Fieldset';
