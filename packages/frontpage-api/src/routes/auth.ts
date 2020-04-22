import { SHA256 }  from 'crypto-js';
import { Next, default as Koa } from 'koa'
import {
  util,
  decorators,
} from '@edgefront/api'
import { AuthService } from '../services'


const {
  Controller, Get, Autowired, Post,
} = decorators
@Controller('/v1/auth')
export default class Anything {
  @Autowired()
  public auth: AuthService
  @Post()
  login(ctx: Koa.Context, next: Next): Promise<void> {
    const { username, password } = ctx.request.body
    if (username === '1' && password === '1') {
      const token = ctx.jwt.sign(
        { username },
        util.getConfig('SECRET'),
        {
          expiresIn: '24h', // expires in 24 hours
        },
      )
      ctx.body = { token }
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
    var encryptedPwd = SHA256(password, 'edgefront').toString();
    const result = await this.auth.register({
      password: encryptedPwd,
      name,
      ...rest,
    })
    ctx.body = {name, encryptedPwd, result}
  }
}
