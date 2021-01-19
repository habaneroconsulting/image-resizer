/** @jsxImportSource @emotion/react */

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Documentation } from './Documentation';
import { ImageResizerContainer } from './ImageResizer';
import { ThemeProvider } from './Theme/components/ThemeProvider';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID) {
	TagManager.initialize({
		gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID
	});
}

ReactDOM.render(
	<StrictMode>
		<ThemeProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path="/image-resizer">
						<ImageResizerContainer />
					</Route>
					<Route path="/image-resizer/documentation">
						<Documentation />
					</Route>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
