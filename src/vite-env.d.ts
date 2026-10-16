/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
	readonly VITE_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
