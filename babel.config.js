module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@binaries': './src/bin',
          '@config': './src/config',
          '@commons': './src/commons',
          '@interfaces': './src/interfaces',
          '@errors': './src/errors',
          '@helpers': './src/helper'
        }
      }
    ]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
