import { defineConfig } from "@farmfe/core";
import postcssPlugin from "@farmfe/js-plugin-postcss";
import path from "path";

export default defineConfig({
	plugins: ["@farmfe/plugin-react", postcssPlugin()],
	server: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:3000/api",
				changeOrigin: true,
				pathRewrite: (path: any) => path.replace(/^\/api/, ""),
				secure: false,
			},
		},
		cors: false,
	},

	compilation: {
		output: {
			path: "../back-end/public",
		},
		resolve: {
			alias: {
				"@/": path.join(process.cwd(), "src"),
			},
		},
	},
});
