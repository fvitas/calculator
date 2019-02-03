module.exports = {
    'globDirectory': 'dist/',
    'globPatterns': [
        '**/*.{html,webmanifest,css,js,png}',
    ],
    "globIgnores": [
        "node_modules/**/*",
        '*icon*',
        "sw.js"
    ],
    'swDest': 'dist/sw.js',
    'swSrc': 'src/sw.js'
}