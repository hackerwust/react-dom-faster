// 短横线 -> 驼峰
export const kebabToCamel = (str) => {
    return str.replace(/\-[a-z]/g, token => token[1].toUpperCase());
};

// 驼峰 -> 短横线
export const camelToKebab = (str) => {
    return str.replace(/[A-Z]/g, token => '-' + token.toLowerCase());
};

export const toUpperCase = (str) => {
    return str.toUpperCase();
};

export const toLowerCase = (str) => {
    return str.toLowerCase();
}