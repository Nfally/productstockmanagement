// module.exports = {
//     roots: ['<rootDir>/src/test/*.spec.ts'],
//     transform: {
//         // '^.+\\.tsx?$': 'ts-jest',
//         '^.+\\.ts?$': 'ts-jest'
//     },
//     // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
//     // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// }
module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: [
        '<rootDir>/(tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};
