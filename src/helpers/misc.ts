export const hasProperty = (obj: Record<string, any>, prop: string) => Object.prototype.hasOwnProperty.call(obj, prop)

export const wait = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(undefined), ms))
