module.exports = function (api) {
    api.cache.never();
    const target = process.env.BUILD_TARGET;
    return {
        presets: [
            ['@babel/preset-env', {
                modules: target === 'esm' ? false : 'cjs'
            }]
        ]
    }
};