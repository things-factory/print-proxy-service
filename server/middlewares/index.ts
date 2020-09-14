var mdns = require('mdns')
var browser

var printers = {}
process.on('bootstrap-module-middleware' as any, async app => {
  var sequence = [
    mdns.rst.DNSServiceResolve(),
    'DNSServiceGetAddrInfo' in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({ families: [4] }),
    mdns.rst.makeAddressesUnique()
  ]

  browser = mdns.createBrowser(mdns.tcp('tfprinter'), { resolverSequence: sequence })

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
