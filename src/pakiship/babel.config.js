module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@app': '../pakipark/src/bootstrap',
            '@config': '../pakipark/src/config',
            '@features': '../pakipark/src/features',
            '@navigation': '../pakipark/src/navigation',
            '@theme': '../pakipark/src/theme',
            '@utils': '../pakipark/src/utils',
          },
        },
      ],
    ],
  };
};
 
