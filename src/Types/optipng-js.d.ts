declare module 'optipng-js' {
	function encode(input: Buffer | Uint8Array, options?: object | string[]): { data: Uint8Array; stderr: string };

	export default encode;
}
