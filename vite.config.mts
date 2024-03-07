import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/image-resizer',

	optimizeDeps: {
		exclude: ['@jsquash/avif', '@jsquash/jpeg', '@jsquash/oxipng', '@jsquash/png', '@jsquash/webp']
	},

	plugins: [react(), svgr()],

	server: {
		watch: {
			followSymlinks: false
		}
	}
});
