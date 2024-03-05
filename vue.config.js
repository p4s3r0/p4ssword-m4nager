const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    manifestOptions: {
        "name": "p4ssword-m4nager",
        "short_name": "P4Ma",
        "theme_color": "#0E0E0E",
        "icons": [
          {
            "src": "./img/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./img/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "./img/icons/android-chrome-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "./img/icons/android-chrome-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "background_color": "#0E0E0E",
        "description": "A simple Password Manager"
    },
    name: 'p4ssword-m4nager',
    themeColor: '#0E0E0E',
    msTileColor: '#0E0E0E',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  }
})
