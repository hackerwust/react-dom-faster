export const toMap = (arr, target, cb) => {
    const isFuntion = typeof cb === 'function';
    arr.forEach(item => target[item] = isFuntion ? cb(item) : true);
};
