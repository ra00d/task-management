import { defineConfig, loadEnv } from "@farmfe/core";
import postcssPlugin from "@farmfe/js-plugin-postcss";
import path from "path";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, ".");
	console.log(env);

	return {
		plugins: ["@farmfe/plugin-react", postcssPlugin()],
		server: {
			proxy: {
				"/api": {
					target: env?.FARM_FRONTEND_DOMAIN,
					changeOrigin: true,
					pathRewrite: (path: any) => path.replace(/^\/api/, ""),
					secure: false,
				},
			},
			cors: false,
		},
		envDir: "./",
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
	};
});
