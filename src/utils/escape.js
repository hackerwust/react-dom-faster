// eslint-disable-next-line
const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
// 特殊字符转义
export const escape = (str) => {
    if (typeof str === 'string') {
        return str.replace(/[&<>"']/g, s => map[s]);
    } else {
        return str + '';
    }
};