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
          '@commons': './src/commons'
        }
      }
    ]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
