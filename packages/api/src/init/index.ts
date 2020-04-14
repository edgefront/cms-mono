
import Koa from 'koa'
import { db } from '../db/index'
import { initRoute } from './initRoute'
import { initAuth } from './initAuth'


async function init(app: Koa): Promise<void> {
  const waitDb = async (): Promise<void> => {
    await db.select(db.raw('1'))
    if (app.context && !app.context.db) {
      // eslint-disable-next-line no-param-reassign
      app.context.db = db
    }
    // eslint-disable-next-line no-console
    console.log('data base connected')
  }
  await waitDb()
  // initAuth() returns an middleware
  app.use(initAuth(app))
  initRoute(app)
}

export { init, init as default }
export * from './initKoa'
export * from './initRoute'
