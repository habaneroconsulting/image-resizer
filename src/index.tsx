/** @jsx jsx  */

import { jsx } from '@emotion/core';
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Documentation } from './Documentation';
import { ImageResizerContainer } from './ImageResizer';
import { ThemeProvider } from './Theme/components/ThemeProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
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
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({});
