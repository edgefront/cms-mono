/**
 * init enviroment variables and other initial procedures here
 */

import dotenv, { DotenvParseOutput } from 'dotenv'
import path from 'path'


/**
 * load dotenv values to process.env.xxx
 */
function initEnv(): void{
  let overrideMode = false
  function loadBaseEnv(): DotenvParseOutput | undefined {
    const result = dotenv.config()
    let baseConfig = result.parsed
    if (result.error) {
      baseConfig = undefined
    }
    if (baseConfig && baseConfig.ENV_OVERRIDE_MODE && String(baseConfig.ENV_OVERRIDE_MODE).toLowerCase() === 'true') {
      // later env value will override both before's env value and NODE_ENV value
      overrideMode = true
    }
    return baseConfig
  }
  function getFilePath(envir: string): string {
    return path.resolve(process.cwd(), 'conf', `${envir}`)
  }
  function loadEnv(envir: string): void {
    const result = dotenv.config({
      path: getFilePath(envir),
    })
    // if overrideMode is on, ignore and override existing process.env values
    if (result && result.parsed && !result.error && overrideMode) {
      Object.keys(result.parsed).forEach((k) => {
        process.env[k] = (result.parsed as object)[k]
      })
    }
  }
  const baseConfig = loadBaseEnv()
  if (baseConfig && baseConfig.ENVIR) {
    loadEnv(baseConfig.ENVIR)
  }
}

// initEnv()
export { initEnv, initEnv as default }
