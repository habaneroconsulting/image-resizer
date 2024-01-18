/** @jsxImportSource @emotion/react */

import { SpinButton, ISpinButtonProps } from '@fluentui/react/lib/SpinButton';

type SpinButtonContainerProps = Omit<ISpinButtonProps, 'step'> & {
	step: number;
};

// Taken from:
// import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
enum Position {
	top = 0,
	bottom = 1,
	start = 2,
	end = 3
}

export const SpinButtonContainer = ({ min, onDecrement, onIncrement, step, ...props }: SpinButtonContainerProps) => {
	const isFloat = step % 1 !== 0;

	return (
		<SpinButton
			labelPosition={Position.top}
			min={step}
			onDecrement={(value) => {
				const currentValue = isFloat ? parseFloat(value) : parseInt(value);

				const newValue = currentValue - step;
				const newValueFixed = isFloat ? newValue.toFixed(1) : newValue.toString();

				if (onDecrement) {
					return onDecrement(newValueFixed);
				}

				return newValueFixed;
			}}
			onIncrement={(value) => {
				const currentValue = isFloat ? parseFloat(value) : parseInt(value);

				const newValue = currentValue + step;
				const newValueFixed = isFloat ? newValue.toFixed(1) : newValue.toString();

				if (onIncrement) {
					return onIncrement(newValueFixed);
				}

				return newValueFixed;
			}}
			step={step}
			{...props}
		/>
	);
};

SpinButtonContainer.displayName = 'SpinButtonContainer';
