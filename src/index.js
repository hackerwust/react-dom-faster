/*
 * @Author: xiaochan
 * @Date: 2019-03-06 20:52:57
 * @Last Modified by: xiaochan
 * @Last Modified time: 2019-03-13 13:07:14
 *
 * render React Component to html
 * but don't create virtual dom, is faster than renderToStaticMarkup
 */
import React from 'react';
import {
    isReactComponent,
    escape,
    camelToKebab,
    validateValueForDomAttr,
    validateValueForSelfDefineAttr
} from './utils';
import {
    domAttrs,
    emptyTags,
    filterAttrs,
    reactLifeCylcle
} from './consts';

const avoidEscape = Object.create(null);
const oldH = React.createElement;

const convertStyleAttr = (value) => {
    let styleStr = '';
    for (let cssProperty in value) {
        styleStr += `${camelToKebab(cssProperty)}:${value[cssProperty]};`;
    }
    return styleStr;
};

const joinDomAttr = (key, value) => ` ${key}="${value}"`;

const getStaticMarkupAttrStr = (attrs) => {
    let attrStr = '';
    for (let key in attrs) {
        if (filterAttrs[key]) {
            continue;
        }
        const domAttr = domAttrs[key];
        const data = attrs[key];
        if (key === 'style' && data) {
            /*
            function _typeof(obj) {
                if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                    _typeof = function _typeof(obj) {
                        return typeof obj;
                    };
                } else {
                    _typeof = function _typeof(obj) {
                        return obj
                            && typeof Symbol === "function"
                            && obj.constructor === Symbol
                            && obj !== Symbol.prototype ? "symbol" : typeof obj;
                    };
                }
                return _typeof(obj);
            }
            */
            // 这里不使用typeof xxx === 'object'，babel会将其转化为_typeof函数
            let value = typeof data === 'string'
                ? convertStyleAttr(data)
                : data;
            attrStr += joinDomAttr(key, value);
            continue;
        }

        if (domAttr) { // dom attr
            if (validateValueForDomAttr(data)) {
                attrStr += joinDomAttr(domAttr, escape(data));
            }
        } else {  // 自定义attr
            if (validateValueForSelfDefineAttr(data)) {
                attrStr += joinDomAttr(key, escape(data));
            }
        }
    }
    return attrStr;
};

const hChildren = (children) => {
    const stack = children.reverse();
    let html = '';
    while (stack.length) {
        const child = stack.pop();
        if  (child && child.push) { //数组
            for (let i = child.length; i--;) {
                stack.push(child[i]);
            }
            continue;
        }
        if (typeof child === 'string' || typeof child === 'number') {
            // child有可能为用户自定义的纯string，如<li>{nameStr}</li>中的nameStr
            // 也可能为经过h函数转换过的component html，对于这种不需要进行转义
            html += avoidEscape[child] === true ? child : escape(child);
            continue;
        }
    }
    return html;
};

const h = function (type, attrs, ...children) {
    attrs = attrs || {};
    // dom element
    if (typeof type === 'string') {
        let html = `<${type}${getStaticMarkupAttrStr(attrs)}`;
        if (!emptyTags[type]) {
            html += '>';
            if (attrs && attrs.dangerouslySetInnerHTML) {
                html += attrs.dangerouslySetInnerHTML.__html;
            }
            html += hChildren(children);
            html += '</' + type + '>';
        } else {
            html += '/>';
        }
        avoidEscape[html] = true;
        return html;
    }

    // React.Fragment
    if (type === React.Fragment) {
        return hChildren(children);
    }

    // class component
    if (isReactComponent(type)) {
        const props = {
            ...(type.defaultProps || {}),
            ...attrs,
            children: children
        };
        const instance = new type(props);
        reactLifeCylcle.forEach(hookName => instance[hookName] && instance[hookName]());
        return instance.render();
    }

    // function component
    if (typeof type === 'function') {
        const props = {
            ...(type.defaultProps || {}),
            ...attrs,
            children: children
        };
        return type(props);
    }
};

export default function fastRenderToStaticMarkup (renderComponent) {
    React.createElement = h;
    const html = renderComponent();
    React.createElement = oldH;
    return html;
}

export { h }