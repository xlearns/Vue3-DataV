import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import DefineOptions from "unplugin-vue-define-options/vite";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import vue from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";
import scss from "rollup-plugin-scss";
import dartSass from "sass";
import { PKG_CAMELCASE_NAME, PKG_BRAND_NAME, version } from "./config";
import { writeBundles, formatBundleFilename } from "./utils";
import { dvRoot, buildOutput, dvOutput } from "./paths";

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;

const minify = process.env.NODE_ENV === "production";

const umd = {
	format: "umd",
	file: path.resolve(buildOutput, "index.js"),
	exports: "named",
	name: "datav",
	globals: {
		vue: "Vue",
		echarts: "Echarts",
	},
};

const umdMinified = {
	...umd,
	file: path.resolve(buildOutput, "index.full.js"),
};

(async () => {
	const config = {
		input: path.resolve(dvRoot, "./index.ts"),
		plugins: [
			DefineOptions(),
			vue({
				isProduction: true,
			}),
			vueJsx(),
			nodeResolve({
				extensions: [".mjs", ".js", ".json", ".ts"],
			}),
			commonjs(),
			esbuild({
				exclude: [],
				sourceMap: minify,
				target: "es2018",
				loaders: {
					".vue": "ts",
				},
				define: {
					"process.env.NODE_ENV": JSON.stringify("production"),
				},
				treeShaking: true,
			}),
			scss({ include: /\.scss$/, sass: dartSass }),
		],
		external: ["vue", "echarts"],
		treeshake: true,
	};

	const bundle = await rollup({
		...config,
		plugins: [...config.plugins, entryPlugin()],
	});
	await writeBundles(bundle, [
		{
			format: "umd",
			file: path.resolve(
				dvOutput,
				"dist",
				formatBundleFilename("index.full", minify, "js")
			),
			exports: "named",
			name: PKG_CAMELCASE_NAME,
			globals: {
				vue: "Vue",
			},
			sourcemap: minify,
			banner,
		},
		{
			format: "esm",
			file: path.resolve(
				dvOutput,
				"dist",
				formatBundleFilename("index.full", minify, "mjs")
			),
			sourcemap: minify,
			banner,
		},
	]);
})();

function entryPlugin() {
	return {
		name: "datav-plugin",
		transform(code, id) {
			if (id.includes("packages")) {
				return {
					code: code
						.replace(
							/@datav\/(components|utils)/g,
							`${path.relative(
								path.dirname(id),
								path.resolve(__dirname, "../packages")
							)}/$1`
						)
						.replace(/\\/g, "/"),
					map: null,
				};
			}

			return { code, map: null };
		},
	};
}
