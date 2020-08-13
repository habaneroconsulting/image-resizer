import React from 'react';

export const useHover = <T extends HTMLElement>(): [React.MutableRefObject<T>, boolean] => {
	const [value, setValue] = React.useState(false);
	const ref = React.useRef<T>(null);

	React.useEffect(() => {
		const container = ref.current;

		if (container) {
			const handleMouseOver = () => setValue(true);
			const handleMouseOut = () => setValue(false);

			container.addEventListener('mouseover', handleMouseOver);
			container.addEventListener('mouseout', handleMouseOut);

			return () => {
				container.removeEventListener('mouseover', handleMouseOver);
				container.removeEventListener('mouseout', handleMouseOut);
			};
		}
	}, []);

	return [ref, value];
};
