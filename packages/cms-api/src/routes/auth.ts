import { Next, default as Koa } from 'koa'
import {
  util,
  decorators,
} from '@edgefront/api'
import { AuthService } from '../services'
import { db } from '@edgefront/api/src/db';


const {
  Controller, Get, Autowired, Post,
} = decorators
@Controller('/v1/auth')
export default class Anything {
  @Autowired()
  public auth: AuthService
  @Post()
  async login(ctx: Koa.Context, next: Next): Promise<void> {
    const { name, password } = ctx.request.body
    const result = await this.auth.login({name, password: this.auth.pwd(password)})
    // if name & password not match, result is empty array.
    if (result && result.length) {
      const token = ctx.jwt.sign(
        { name },
        util.getConfig('SECRET') || 'edgefront',
        {
          expiresIn: '24h', // expires in 24 hours
        },
      )
      ctx.body = { token, result }
      return next()
    }
    ctx.response.status = 401
    ctx.body = 'login failed'
    return next()
  }
  @Post()
  async register(ctx: Koa.Context, next: Next){

    // Encrypt
    const { password, name, ...rest} = ctx.request.body; // ctx.query
    var encryptedPwd = this.auth.pwd(password)
    const result = await this.auth.register({
      password: encryptedPwd,
      name,
      ...rest,
    })
    ctx.body = {name, encryptedPwd, result}
  }
}
