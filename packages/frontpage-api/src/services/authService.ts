import { db } from '@edgefront/api'

class AuthService {
  table = 'fr_user'

  async register({name, password, mobile}): Promise<any> {
    if(!(name && password && mobile)) {
      return null;
    }
    let result = null;
    try {
      result = await db(this.table).insert({
        name,
        password,
        mobile
      })
    } catch (error) {
      console.log(error);
    }
    return result
  }
}

export { AuthService, AuthService as default }
