export const transformToMap = (arr) => {
    const map = Object.create(null);
    arr.forEach(item => { map[item] = true; });
    return map;
};

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';


export const isReactComponent = component => !!(component && component.prototype && component.prototype.isReactComponent);

// eslint-disable-next-line
const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'};
// 转义特殊字符
export const escape = (str) => {
    if (typeof str === 'string') {
        return str.replace(/[&<>"']/g, s => map[s]);
    } else {
        return str + '';
    }
};

export const convertToValidCssProperty = (str) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};