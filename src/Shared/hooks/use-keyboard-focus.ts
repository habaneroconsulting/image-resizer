import React from 'react';

export const useKeyboardFocus = (): boolean => {
	const [value, setValue] = React.useState(false);

	React.useEffect(() => {
		const handleMouseDown = () => setValue(false);
		const handleKeyDown = () => setValue(true);

		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return value;
};
