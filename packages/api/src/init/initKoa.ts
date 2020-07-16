import bodyParser from 'koa-bodyparser'
import Koa from 'koa'

function initKoa(): Koa {
  const app = new Koa()

  // body parser
  app.use(bodyParser())

  // logger
  app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    // eslint-disable-next-line no-console
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
  })

  // x-response-time & CORS

  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
    ctx.set('Access-Control-Allow-Origin', '*')
    // TODO only add below header for OPTIONS medthod
    // TODO write another middleware for CORS
    ctx.set('Access-Control-Allow-Headers', '*')
  })
  return app
}

export { initKoa, initKoa as default }
