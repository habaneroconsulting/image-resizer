/** @jsxImportSource @emotion/react */

import React from 'react';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { loadTheme } from '@fluentui/react/lib/Styling';

import theme from '../theme.json';
import { GlobalStyles } from './GlobalStyles';

// Load Fluent UI theme colours
loadTheme({
	defaultFontStyle: {
		fontFamily: theme.fonts.body
	},
	palette: theme.colors
});

type ThemeProviderProps = {
	children?: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	return (
		<EmotionThemeProvider theme={theme as any}>
			<GlobalStyles />

			{children}
		</EmotionThemeProvider>
	);
};

ThemeProvider.displayName = 'ThemeProvider';
