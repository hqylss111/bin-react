export type Type = string;
export type Key = string | null;
export type Ref = any;
export type Props = any;
export type ElementType = any;
export interface ReactElementType {
	$$typeof: Symbol | number;
	key: Key;
	type: Type;
	props: Props;
	__mark: string; // react 中不存在熟悉
}
