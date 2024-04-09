/** @jsxImportSource @emotion/react */

import { createRoot } from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Documentation } from './Documentation';
import { ImageResizerContainer } from './ImageResizer';
import { ThemeProvider } from './Theme/components/ThemeProvider';

if (import.meta.env.VITE_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID) {
	TagManager.initialize({
		gtmId: import.meta.env.VITE_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID
	});
}

const router = createBrowserRouter([
	{
		path: '/image-resizer',
		element: <ImageResizerContainer />
	},
	{
		path: '/image-resizer/documentation',
		element: <Documentation />
	}
]);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
	<ThemeProvider>
		<RouterProvider router={router} />
	</ThemeProvider>
);
