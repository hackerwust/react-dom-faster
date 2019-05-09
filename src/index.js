/*
 * @Author: xiaochan
 * @Date: 2019-03-06 20:52:57
 * @Last Modified by: xiaochan
 * @Last Modified time: 2019-05-09 22:19:35
 *
 * render React Component to html
 * but don't create virtual dom, is faster than renderToStaticMarkup
 */
import React from 'react';
import {
    isValidElement,
    cloneElement,
    noop
} from './utils';
import h from './h';

const mockProperty = [
    'createElement',
    'isValidElement',
    'cloneElement',
    // react hooks
    'useState',
    'useRef',
    'useEffect',
    'useReducer',
    'useContext',
    'useLayoutEffect',
    'useCallback',
    'useMemo',
    'useImperativeHandle',
    'useDebugValue'
];
const reactRuntime = {
    prefix: 'old_',

    init: function () {
        const prefix = this.prefix;
        for (let i = 0, len = mockProperty.length; i < len; i++) {
            const prop = mockProperty[i];
            this[prefix + prop] = React[prop];
        }
    },

    mock: function () {
        React.createElement = h;
        React.isValidElement = isValidElement;
        React.cloneElement = cloneElement;
        React.useState = function (initialState) { return [initialState]};
        React.useReducer = function (_reducer, initialArg) { return [initialArg]};
        React.useRef = noop;
        React.useEffect = noop;
        React.useContext = noop;
        React.useLayoutEffect = noop;
        React.useCallback = noop;
        React.useMemo = noop;
        React.useImperativeHandle = noop;
        React.useDebugValue = noop;
    },

    recovery: function () {
        const prefix = this.prefix;
        for (let i = 0, len = mockProperty.length; i < len; i++) {
            const prop = mockProperty[i];
            React[prop] = this[prefix + prop];
        }
    }
};
reactRuntime.init();

export default function fastRenderToStaticMarkup (renderComponent) {
    // mock react interface runtime
    reactRuntime.mock();
    let html = '';
    try {
        html = renderComponent();
    } catch (e) {
        // 执行报错捕获时不处理异常，抛给调用方处理。
        // 这里只是为了恢复react上下文保证react程序的正常运行
        reactRuntime.recovery();
        throw e;
    }
    // recovery react interface runtime
    reactRuntime.recovery();
    if (!html) {
        return '';
    } else {
        return html.hasOwnProperty('html') ? html.html : html;
    }
}

export { h }
