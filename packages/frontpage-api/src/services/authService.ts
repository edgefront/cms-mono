import { SHA256 }  from 'crypto-js';
import { db } from '@edgefront/api'

class AuthService {
  table = 'fr_user'

  async login({name, password}): Promise<any> {
    if(!(name && password)) {
      return null;
    }
    let result;
    try {
      result = await db(this.table).where({
        name,
        password,
      })
    } catch (error) {
      console.log(error);
      result = null
    }
    return result
  }

  async register({name, password, mobile}): Promise<any> {
    if(!(name && password && mobile)) {
      return null;
    }
    let result;
    try {
      result = await db(this.table).insert({
        name,
        password,
        mobile
      })
    } catch (error) {
      console.log(error);
      result = null;
    }
    return result
  }

  pwd(password) {
    var encryptedPwd = SHA256(password, 'edgefront').toString();
    return encryptedPwd;
  }
}

export { AuthService, AuthService as default }
