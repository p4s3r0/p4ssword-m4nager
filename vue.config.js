const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    "name": "p4ssword-m4nager",
    "short_name": "P4M",
    "theme_color": "#0E0E0E",
    "msTileColor": '#0E0E0E',
    "appleMobileWebAppCapable": 'yes',
    "appleMobileWebAppStatusBarStyle": 'black',

    manifestOptions: {
      "icons": [
        {
          "src": "./icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "./icons/android-chrome-maskable-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "./icons/android-chrome-maskable-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      "start_url": ".",
      "display": "standalone",
      "background_color": "#3e3e3e",
      "description": "A simple Password Manager"
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'dev/sw.js',
    }
  }
})
