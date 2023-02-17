const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_KEY = supportSymbol ? Symbol.for('react.Element') : 0xeac7;
