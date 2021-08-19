export const info = (message: string, payload?: any) => generator('blue', 'INFO :: ', message, payload)
export const warn = (message: string, payload?: any) => generator('orange', 'WARN :: ', message, payload)
export const error = (message: string, payload?: any) => generator('red', 'ERROR :: ', message, payload)

const generator = (color: string, prefix: string, message: string, payload?: any) => {
  if (payload === undefined) console.log(`%c${prefix}${message}`, `color:${color};`)
  else console.log(`%c${prefix}${message}`, `color:${color};`, `\n`, payload)
}
