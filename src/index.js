/*
 * @Author: xiaochan
 * @Date: 2019-03-06 20:52:57
 * @Last Modified by: xiaochan
 * @Last Modified time: 2019-03-12 20:53:28
 *
 * render React Component to html
 * but don't create virtual dom, is faster than renderToStaticMarkup
 */
import React from 'react';
import {
    isArray,
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

const convertStyleAttr = (value) => {
    let styleStr = '';
    for (let cssProperty in value) {
        styleStr += `${camelToKebab(cssProperty)}:${value[cssProperty]};`;
    }
    return styleStr;
};

const joinDomAttr = (key, value) => ` ${key}="${value}"`;

const getStaticMarkupAttrStr = (attrs) => {
    if (!attrs) { return ''; }

    let attrStr = '';
    for (let key in attrs) {
        if (filterAttrs[key]) {
            continue;
        }
        const domAttr = domAttrs[key];
        const data = attrs[key];
        // style
        if (key === 'style' && data) {
            // 对于style属性暂时不转义
            const value = typeof data === 'object'
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
        if  (isArray(child)) {
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

    let html = `<${type}${getStaticMarkupAttrStr(attrs)}`;

    if (!emptyTags[type]) {
        html += '>';
        if (attrs && attrs.dangerouslySetInnerHTML) {
            html += attrs.dangerouslySetInnerHTML.__html;
        }
        html += hChildren(children);
        html += `</${type}>`;
    } else {
        html += '/>';
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