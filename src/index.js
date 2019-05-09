/*
 * @Author: xiaochan
 * @Date: 2019-03-06 20:52:57
 * @Last Modified by: xiaochan
 * @Last Modified time: 2019-05-09 20:55:13
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
    unitLessNumber
} from './consts';

const isValidElement = (element) => element && element.hasOwnProperty('html');
const cloneElement = function (element) {
    if (isValidElement(element)) {
        return element.html;
    } else {
        return '';
    }
};
const attachAttrsToComponent = (component, attrs) => {
    if (isValidElement(component)) {
      component.key = attrs.key;
      component.dangerouslySetInnerHTML = attrs.dangerouslySetInnerHTML;
      component.children = attrs.children;
      component.props = attrs;
    }
};

const reactRuntime = {
    oldH: React.createElement,
    oldIsValidElement: React.isValidElement,
    oldCloneElement: React.cloneElement,
    mock: function () {
        React.createElement = h;
        React.isValidElement = isValidElement;
        React.cloneElement = cloneElement;

    },
    recovery: function () {
        React.createElement = this.oldH;
        React.isValidElement = this.oldIsValidElement;
        React.cloneElement = this.cloneElement;
    }
};

const convertStyleAttr = (value) => {
    let styleStr = '';
    let delimiter = '';
    for (let cssProperty in value) {
        let cssPValue = value[cssProperty];
        if (typeof cssPValue === 'number' && cssPValue !== 0 && !unitLessNumber[cssProperty]) {
            cssPValue += 'px';
        }
        styleStr += delimiter + camelToKebab(cssProperty) + ':' + cssPValue;
        delimiter = ';';
    }
    return styleStr;
};

const joinDomAttr = (key, value) => ' ' + key + '="' + value + '"';

const getStaticMarkupAttrStr = (attrs) => {
    let attrStr = '';
    for (let key in attrs) {
        if (filterAttrs[key]) {
            continue;
        }
        const domAttr = domAttrs[key];
        const data = attrs[key];
        if (key === 'style' && data) {
            // 这里不使用typeof xxx === 'object'，babel会将其转化为_typeof函数
            let value = typeof data === 'string'
                ? data
                : convertStyleAttr(data);
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
        // 经过h函数生成的html
        if (child && child.hasOwnProperty('html')) {
            html += child.html;
            continue;
        }

        // string
        if (typeof child === 'string') {
            // child有可能为用户自定义的纯string，如<li>{nameStr}</li>中的nameStr,需要进行转义
            html += escape(child);
            continue;
        }

        // array
        if  (child && child.push) {
            for (let i = child.length; i--;) {
                stack.push(child[i]);
            }
            continue;
        }

        // number
        if (typeof child === 'number') {
            html += child + '';
            continue;
        }

    }
    return html;
};

/**
 *  @return string | object
 * */
const h = function (type, attrs) {
    let children = [];
    for (let i = 2, len = arguments.length; i < len; i++) {
        const arg = arguments[i];
        if (arg && arg.push && arg.pop) {
            children = children.concat(arg);
        } else {
            children.push(arg);
        }
    }
    attrs = attrs || {};
    attrs.children = children;
    // dom element
    if (typeof type === 'string') {
        let html = '<' + type + getStaticMarkupAttrStr(attrs);
        if (!emptyTags[type]) {
            html += '>';
            if (attrs.hasOwnProperty('dangerouslySetInnerHTML')) {
                html += attrs.dangerouslySetInnerHTML.__html;
            }
            html += hChildren(children);
            html += '</' + type + '>';
        } else {
            html += '/>';
        }
        const result = { html };
        attachAttrsToComponent(result, {});
        return result;
    }

    // React.Fragment
    if (type === React.Fragment) {
        return { html: hChildren(children) };
    }

    // class component
    if (isReactComponent(type)) {
        const props = {
            ...(type.defaultProps || {}),
            ...attrs
        };
        const instance = new type(props);
        instance.props = props;
        instance.componentWillMount && instance.componentWillMount();
        instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount();
        let result = instance.render();
        if (!result) {
            result = { html: '' };
        }
        attachAttrsToComponent(result, attrs);
        return result;
    }

    // function component
    if (typeof type === 'function') {
        const props = {
            ...(type.defaultProps || {}),
            ...attrs
        };
        let result = type(props);
        if (!result) {
            result = { html: '' };
        }
        attachAttrsToComponent(result, attrs);
        return result;
    }
    return '';
};

export default function fastRenderToStaticMarkup (renderComponent) {
    // mock react interface runtime
    reactRuntime.mock();
    const html = renderComponent();
    // recovery react interface runtime
    reactRuntime.recovery();
    if (!html) {
        return '';
    } else {
        return html.hasOwnProperty('html') ? html.html : html;
    }
}

export { h }
