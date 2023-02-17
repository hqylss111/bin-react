import rollupPluginGeneratePackageJson from 'rollup-plugin-generate-package-json';
import { getPackagesJson, resolvePakPath, getPluginsConfig } from './utils';
// react 打包配置
const { name, module } = getPackagesJson('react');

// 输入路径
const inputPath = resolvePakPath(name);
// 输出路径
const outputPath = resolvePakPath(name, true);

console.log(outputPath, 'outputPath');
export default [
	{
		input: `${inputPath}/${module}`, // 入口
		output: {
			file: `${outputPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		}, // 出口
		plugins: [
			...getPluginsConfig(),
			rollupPluginGeneratePackageJson({
				inputFolder: inputPath,
				outputFolder: outputPath,
				baseContents: ({ name, version, description }) => {
					console.log(outputPath,'outputPath')
					return {
						name,
						version,
						description,
						main: 'index.js'
					};
				}
			})
		] //配置
	},
	{
		input: `${inputPath}/src/jsx.ts`,
		output: [
			//  编译后
			{
				file: `${outputPath}/js-runtime.js`,
				name: 'js-runtime.js.js',
				format: 'umd'
			},
			//  编译后
			{
				file: `${outputPath}/js-dev-runtime.js`,
				name: 'js-dev-runtime.js.js',
				format: 'umd'
			}
		],
		plugins: getPluginsConfig() //配置
	}
];
