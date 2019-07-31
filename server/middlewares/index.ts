var mdns = require('mdns')
var browser

var printers = {}
process.on('bootstrap-module-middleware' as any, app => {
  browser = mdns.createBrowser(mdns.tcp('tfprinter'))

  browser.on('serviceUp', service => {
    printers[service.name] = service
    ;(global as any).printers = [...Object.values(printers)]
  })
  browser.on('serviceDown', service => {
    delete printers[service.name]
    ;(global as any).printers = [...Object.values(printers)]
  })

  browser.start()
})

process.on('exit' as any, code => {
  if (browser) {
    browser.stop()
    browser = null
  }
})
