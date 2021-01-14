declare module 'mozjpeg-js' {
	function encode(input: Buffer | Uint8Array, options?: { quality: number }): { data: Uint8Array; stderr: string };
}
