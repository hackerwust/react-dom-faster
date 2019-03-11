export default {
    require: [
        'esm'
    ],
    files: [
        'test/**/*.test.js'
    ],
    babel: {
        extensions: ['js', 'jsx'],
        testOptions: {
            presets: [
                'module:ava/stage-4',
                '@babel/preset-react',
                '@babel/preset-env'
            ]
        }
    }
}