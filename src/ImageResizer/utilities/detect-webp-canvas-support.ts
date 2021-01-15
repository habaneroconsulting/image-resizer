export function detectWebPCanvasSupport() {
	try {
		const canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;

		const dataURL = canvas.toDataURL('image/webp');

		return (
			dataURL ===
			'data:image/webp;base64,UklGRkAAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAIAAAAAAFZQOCAYAAAAMAEAnQEqAQABAAFAJiWkAANwAP79NmgA'
		);
	} catch (_e) {
		return false;
	}
}
