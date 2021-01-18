/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { useEffect, useState } from 'react';
import { useUID } from 'react-uid';

type FieldsetProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	isExpanded?: boolean;
	legend: string;
	onClick?: () => void;
};

/**
 * Common styles for fieldsets.
 */
export const Fieldset = ({ children, legend, isExpanded = false, onClick, ...props }: FieldsetProps) => {
	const theme = useTheme();

	const [isOpen, setIsOpen] = useState(isExpanded);
	const uid = useUID();

	useEffect(() => {
		setIsOpen(isExpanded);
	}, [isExpanded]);

	return (
		<div
			css={{
				border: `1px solid`,
				borderColor: theme.colors.neutralLight,
				borderLeft: 0,
				borderRight: 0,
				marginTop: -1
			}}
			{...props}
		>
			<button
				aria-controls={`${uid}-region`}
				aria-expanded={isOpen}
				css={{
					alignItems: 'center',
					backgroundColor: 'transparent',
					border: 0,
					cursor: 'pointer',
					display: 'flex',
					fontSize: theme.fontSizes[3],
					fontWeight: theme.fontWeights.semibold,
					height: '44px',
					justifyContent: 'space-between',
					paddingLeft: theme.space[3],
					paddingRight: theme.space[3],
					textAlign: 'left',
					width: '100%',

					'&:focus, &:hover': {
						backgroundColor: theme.colors.neutralLighter
					}
				}}
				onClick={
					onClick
						? onClick
						: () => {
								setIsOpen(!isOpen);
						  }
				}
				id={`${uid}-button`}
				type="button"
			>
				<span>{legend}</span>

				<FontIcon iconName={isOpen ? 'ChevronUp' : 'ChevronDown'} />
			</button>

			<div
				aria-labelledby={`${uid}-button`}
				css={{
					padding: theme.space[3],
					paddingTop: theme.space[2]
				}}
				hidden={!isOpen}
				id={`${uid}-region`}
				role="region"
			>
				{children}
			</div>
		</div>
	);
};

Fieldset.displayName = 'Fieldset';
