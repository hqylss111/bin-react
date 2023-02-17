import { REACT_ELEMENT_KEY } from 'shared/ReactSymbol';
import { Type, Key, Ref, Props, ReactElementType,ElementType } from 'shared/ReactTypes';
/**
 * 创建react dom
 * @param type 组件类型
 * @param key 唯一表示
 * @param ref 组件实例
 * @param props 传递参数
 */
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_KEY,
		key,
		type,
		props,
		__mark: 'lss' // react 中不存在熟悉
	};
	return element;
};


export const jsxDev = (type:ElementType,config:any,...mayChildren:any) => {
	let key:Key = null;
	let props:Props = {};
	let ref:Ref = null;
	// 处理config 
	for (const prop in config) {
		let val = config[prop];
		if(prop === 'key'){
			if(val !== undefined){
				key = ('' + val);
			};
			continue; //终止当前循环
		};
		if(prop === 'ref'){
			if(val !== undefined){
				ref = val
			};
			continue
		};
		// 判断是不是config自己远行上的值
		if({}.hasOwnProperty.call(config,prop)){
			props[prop] = val;
		};
	};
	//Children 可能是多个 也可能是一个
	const mayChildrenLength = mayChildren.length;
	if(mayChildrenLength){
		if(mayChildrenLength === 1){
			props.children = mayChildren[0];
		}else{
			props.children = mayChildren;
		};
	};
	return ReactElement(type,key,ref,props);
};