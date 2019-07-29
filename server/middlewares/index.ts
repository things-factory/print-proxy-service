var bonjour = require('bonjour')()
process.on('bootstrap-module-middleware' as any, app => {
  var browser = bonjour.find(
    {
      type: 'tfprinter',
      protocol: 'tcp'
    },
    service => {
      ;(global as any).printers = browser.services
    }
  )

  browser.start()
})
