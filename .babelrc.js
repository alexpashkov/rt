module.exports = {
  presets: [
    ['env', { modules: process.env.NODE_ENV === 'test' && 'commonjs' }],
    'react'
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-class-properties',
    'emotion',
    'react-hot-loader/babel'
  ]
};
