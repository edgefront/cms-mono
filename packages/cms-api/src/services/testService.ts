import { db } from '@edgefront/api'

class TestService {
  testMethod(param): string {
    return `${param} called`
  }

  async dbService(): Promise<any []> {
    const result = await db.user_tb.select('*')
    return result
  }
}

export { TestService, TestService as default }