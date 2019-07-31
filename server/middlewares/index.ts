var bonjour = require('bonjour')()
var browser

process.on('bootstrap-module-middleware' as any, app => {
  browser = bonjour.find({
    type: 'tfprinter',
    protocol: 'tcp'
  })

  browser.on('up', service => {
    ;(global as any).printers = browser.services
  })
  browser.on('down', service => {
    ;(global as any).printers = browser.services
  })

  browser.start()
})

process.on('exit' as any, code => {
  if (browser) {
    browser.stop()
    browser = null
  }
})
