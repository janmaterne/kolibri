import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		UnoCSS(),
		EnvironmentPlugin({
			BUILD_DATE: null,
			COMMIT_HASH: null,
			ENABLE_TAG_NAME_TRANSFORMER: null,
			THEME_EXPORT: null,
			THEME_MODULE: null,
		}),
	],
	root: '.', // Root auf das Hauptverzeichnis setzen
	publicDir: 'public', // Public-Ordner für statische Dateien
	server: {
		open: true, // öffnet automatisch den Browser
		port: 3000, // Port ändern, falls gewünscht
	},
});
