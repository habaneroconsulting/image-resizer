/**
 * Converts a size in bytes to a more human-readable size.
 * @param size {number} A file size in bytes.
 */
export function getReadableSize(size: number) {
	const sizes = [' Bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];

	for (let i = 1; i < sizes.length; i++) {
		if (size < Math.pow(1024, i)) {
			return Math.round((size / Math.pow(1024, i - 1)) * 100) / 100 + sizes[i - 1];
		}
	}

	return size;
}
