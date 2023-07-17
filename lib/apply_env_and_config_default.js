import { camelCase, snakeCase } from 'lodash-es'
import { localLang } from '#lib/local_lang'
import { config } from './config/config.js'

const fallbackConfigOptions = [
  'bot',
  'clipboard',
  'instance',
  'json',
  'lang',
  'maxlag',
  'sparql-endpoint',
  'verbose',
]

export function applyEnvAndConfigDefault (program) {
  // If a --lang option is passed, it should be considered a request to not fallback on other langs
  if (program.lang != null) program.strictLang = program.lang
  fallbackConfigOptions.forEach(fallbackToConfigOption(program))
  program.lang = program.lang || config.lang || localLang
}

const fallbackToConfigOption = program => parameter => {
  const key = camelCase(parameter)
  if (program[key] != null) return

  program[key] = getEnvVariable(parameter)
  if (program[key] != null) return

  program[key] = config[parameter]
}

const getEnvVariable = parameter => {
  const key = `WB_${snakeCase(parameter).toUpperCase()}`
  const value = process.env[key]
  if (value == null || value === '') return
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}
