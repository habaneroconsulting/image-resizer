/** @jsx jsx */
/** @jsxFrag React.Fragment */

import { jsx } from '@emotion/core';
import React from 'react';

import { loadTheme } from '@fluentui/react/lib/Styling';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

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
		<EmotionThemeProvider theme={theme}>
			<GlobalStyles />

			{children}
		</EmotionThemeProvider>
	);
};

ThemeProvider.displayName = 'ThemeProvider';
