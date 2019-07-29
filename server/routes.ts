import { printers } from './controllers/printers'

process.on('bootstrap-module-history-fallback' as any, (app, fallbackOption) => {
  fallbackOption.whiteList.push(['/printers'])
})

process.on('bootstrap-module-route' as any, (app, routes) => {
  routes.get('/printers', async (context, next) => {
    context.body = {
      success: true,
      printers: printers()
    }
  })
})
