import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

// 打包后的路径 node_modules包需要在这下面
const distPath = path.resolve(__dirname, '../../dist/node_modules');
// 打包前的地址
const pkgPath = path.resolve(__dirname, '../../packages');

// 处理包路径
export const resolvePakPath = (pathName, isDiv) => {
	if (isDiv) {
		return `${distPath}/${pathName}`;
	}
	return `${pkgPath}/${pathName}`;
};

// 获取对应项目的package文件
export function getPackagesJson(pathName) {
	const path = `${resolvePakPath(pathName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}
export function getPluginsConfig(
	{ typescriptConfig } = { typescriptConfig: {} }
) {
	return [cjs(), ts(typescriptConfig)];
};
