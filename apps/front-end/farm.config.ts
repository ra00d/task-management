import { defineConfig } from "@farmfe/core";
import postcssPlugin from "@farmfe/js-plugin-postcss";
import path from "path";

export default defineConfig({
	plugins: ["@farmfe/plugin-react", postcssPlugin()],

	compilation: {
		// output: {
		// 	path: "../back-end/public",
		// },
		resolve: {
			alias: {
				"@/": path.join(process.cwd(), "src"),
			},
		},
	},
});
