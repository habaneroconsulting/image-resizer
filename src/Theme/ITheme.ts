export interface ITheme {
	breakpoints: [string, string, string, string, string, string];
	colors: {
		themePrimary: string;
		themeDark: string;
		themeDarker: string;
		themeLight: string;
		neutralPrimary: string;
		neutralSecondary: string;
		neutralLight: string;
		neutralLighter: string;
		neutralLighterAlt: string;
		neutralDark: string;
		black: string;
		white: string;
		primaryText: string;
		bodyText: string;
		disabledBackground: string;
		disabledText: string;
	};
	fonts: {
		body: string;
		heading: string;
	};
	fontSizes: [number, number, number, number, number, number, number, number, number, number, number];
	fontWeights: {
		regular: number;
		semibold: number;
		bold: number;
	};
	lineHeights: {
		body: number;
		heading: number;
	};
	shadows: {
		depth16: string;
	};
	space: [number, number, number, number, number, number, number, number, number, number, number];
}
