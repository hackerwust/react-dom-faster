/*
 * @Author: xiaochan
 * @Date: 2019-03-06 20:52:57
 * @Last Modified by: xiaochan
 * @Last Modified time: 2019-03-07 12:44:16
 *
 * render React Component to html
 * but don't create virtual dom, is faster than renderToStaticMarkup
 */
import React from 'react';
import {
    isArray,
    isReactComponent,
    escape,
    convertToValidCssProperty
} from './util';
import filterAttrs from './filterAttrs';
import emptyTags from './emptyTags';

const DOMAttributeNames = {
    className: 'class',
    htmlFor: 'for'
};

const reactLifeCylcle = [
    'componentWillMount',
    'UNSAFE_componentWillMount'
];
const avoidEscape = Object.create(null);

const convertAttr = (key, value) => {
    if (key === 'style' && typeof value === 'object') {
        let styleStr = '';
        for (let cssProperty in value) {
            styleStr += `${convertToValidCssProperty(cssProperty)}:${value[cssProperty]};`;
        }
        return styleStr;
    }
    return value;
};

const hChildren = (children) => {
    const stack = children.reverse();
    let html = '';
    while (stack.length) {
        const child = stack.pop();

        // 处理组件返回null/undefined的情况
        if (child === null || child === undefined) {
            continue;
        }

        if (isArray(child)) {
            for (let i = child.length; i--;) {
                stack.push(child[i]);
            }
        } else {
            // child有可能为用户自定义的纯string，如<li>{nameStr}</li>中的nameStr
            // 也可能为经过h函数转换过的component html，对于这种不需要进行转义
            html += avoidEscape[child] === true ? child : escape(child);
        }
    }
    return html;
};

const h = function (type, attrs, ...children) {
    if (type === React.Fragment) {
        return hChildren(children);
    }
    if (typeof type === 'function') {
        const props = {
            // assign default props
            ...(type.defaultProps || {}),
            ...(attrs || {}),
            // add children to props
            children: children
        };

        if (isReactComponent(type)) {
            const instance = new type(props);
            reactLifeCylcle.forEach(hookName => instance[hookName] && instance[hookName]());
            return instance.render();
        } else {
            return type(props);
        }
    }

    let html = `<${type}`;
    if (attrs) {
        for (let key in attrs) {
            // 对于react key dangerouslySetInnerHTML onclick等属性不需要拼接到html上
            if (filterAttrs[key]) {
                continue;
            }
            const value = escape(convertAttr(key, attrs[key]));
            html += ` ${DOMAttributeNames[key] ? DOMAttributeNames[key] : key}="${value}"`;
        }
    }
    html += '>';
    if (!emptyTags[type]) {
        if (attrs && attrs.dangerouslySetInnerHTML && attrs.dangerouslySetInnerHTML.__html) {
            html += attrs.dangerouslySetInnerHTML.__html;
        }
        html += hChildren(children);
        html += `</${type}>`;
    }

    avoidEscape[html] = true;
    return html;
};

export default function fastRenderToStaticMarkup (renderComponent) {
    const oldH = React.createElement;
    React.createElement = h;
    const html = renderComponent();
    React.createElement = oldH;
    return html;
}

export { h }