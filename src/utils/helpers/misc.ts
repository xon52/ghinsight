export const hasProperty = (obj: Record<string, any>, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop)

export const wait = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(undefined), ms))

export const decodeBase64 = (s: string) => decodeURIComponent(escape(globalThis.atob(s)))
