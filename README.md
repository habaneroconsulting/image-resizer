# habaneroconsulting/image-resizer

This tool helps resize and crop basic images and provides a set of query string
parameters to link to specific maximum widths and aspect ratios. It is meant to
help content authors create specific sized imagery when their content management
system may not provide cropping.

This project makes use of [`react-dropzone`](https://github.com/react-dropzone/react-dropzone)
and [`react-image-crop`](https://github.com/DominicTobias/react-image-crop).

## Query string options:

- **max-w** `[number]`: Sets the maximum width of the image.
- **ar-w** `[number]`: Sets the aspect ratio width.
- **ar-h** `[number]`: Sets the aspect ratio height.
- **format** `['jpeg'|'png'|'avif'|'webp']`: Sets the format of the image.

## Available Scripts (via Create React App)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
