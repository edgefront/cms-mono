import Koa, { Next, Middleware } from 'koa'
import { getConfig } from '../util'

function errorResponse(ctx: Koa.Context): void {
  ctx.response.status = 401
  ctx.response.body = 'Bad Authorization header format. Format is "Authorization: Bearer <token>"'
}

// https://www.npmjs.com/package/koa-is-json
function isJSON (body) {
  return !(
    !body ||
    typeof body === 'string' ||
    typeof body.pipe === 'function' ||
    Buffer.isBuffer(body)
  )
}

function isString(body) {
  return typeof body === 'string';
}

// function isError (body) {
//   if
// }

// inspired by https://github.com/koajs/json/blob/master/index.js
// this is a middleware of Koa, to wrap body in an object automatically.
function initWrap(): Middleware {

  const middleware = function wrap(ctx: Koa.Context, next: Next): Promise<void> | void {
    return next().then(() => {
      const body = ctx.body

      // unsupported body type
      const json = isJSON(body)
      const stream = body 
                          && typeof body.pipe === 'function'
                          && body._readableState;
      if (stream) return

      if (json) {
        // original ctx.body is json and contains error field
        if (ctx.body && ctx.body.error){
          const {error, ...restBody} = ctx.body;
          ctx.body = {
            // data: {
            //   ...restBody
            // },
            error,
            // if ctx.body contains error field, modify default status code from 200 to 401
            status: ctx.response.status === 200 ? 401 : ctx.response.status
          }
        } else {
          // original ctx.body is json and no error field
          ctx.body = {
            data: {
              ...ctx.body
            },
            status: ctx.response.status
          }
        }
      } else {
        // ctx.body is string and contains error:
        if (String(ctx.body).toLowerCase().startsWith('error:')){
          ctx.body = {
            error: String(ctx.body).replace(/error\:/i, '').trim(),
            status: ctx.response.status === 200 ? 401 : ctx.response.status
          }
        } else {
          // ctx.body is string and no 'error:'
          console.log(ctx.response)
          ctx.body = {
            data: ctx.body,
            status: ctx.response.status,
            error: ctx.body === undefined ? ctx.response.message : undefined,
          }
        }
      }

    })
  }

  return middleware
}

export { initWrap, initWrap as default }
