import crypto from 'crypto-es'

export const encrypt = (payload: string, key: string) => crypto.AES.encrypt(payload, key).toString()
export const decrypt = (payload: string, key: string) => {
  try {
    return crypto.AES.decrypt(payload, key).toString(crypto.enc.Utf8)
  } catch {
    return ''
  }
}
