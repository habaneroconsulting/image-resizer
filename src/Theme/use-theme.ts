import { useTheme as useEmotionTheme } from 'emotion-theming';

import { ITheme } from './ITheme';

export const useTheme = <T = ITheme>() => {
	return useEmotionTheme<T>();
};
