export const validateValueForDomAttr = (value) => {
    // type: string/number/boolean时attr合法
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return true;
    } else {
        return false;
    }
};

export const validateValueForSelfDefineAttr = (value) => {
    // type: string/number时attr合法
    if (typeof value === 'string' || typeof value === 'number') {
        return true;
    } else {
        return false;
    }
};