// const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&/=]*)/
const emailPattern = /^(([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+)?$/
// const phonePattern = /^0[0-9]{9}?$/
// const namePattern = /^([a-zA-Z]+([a-zA-Z0-9 -.])+([a-zA-Z0-9]))?$/
// const userPattern = /^([a-zA-Z]{1}([a-zA-Z\d][_]?){2,18}[a-zA-Z\d]{1})$/
// const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&_])[a-zA-Z\d!@#$%&_]*$/
// const passphrasePattern = /^[a-zA-Z][a-zA-Z\d!@#$%&_,. ]*[a-zA-Z\d!@#$%&_,.]$/
// const currencyPattern = /^(\d{0,}.\d{0,2})?$/

// export const patterns = {
//   required: (v: string) => !!v || 'Required.',
//   arrayRequired: (v: string) => v.length > 0 || 'Required.',
//   len: (v: string, l: number) => !v || v.length === l || `This field requires exactly ${l} characters.`,
//   min: (v: string, l: number) => !v || v.length >= l || `Minimum of ${l} characters is required.`,
//   max: (v: string, l: number) => !v || v.length <= l || `Maximum of ${l} characters is required.`,
//   min3: (v: string) => !v || v.length >= 3 || 'Minimum of 3 characters is required.',
//   min20: (v: string) => !v || v.length >= 20 || 'Minimum of 20 characters is required.',
//   max20: (v: string) => !v || v.length <= 20 || 'Maximum of 20 characters is allowed.',
//   max40: (v: string) => !v || v.length <= 40 || 'Maximum of 40 characters is allowed.',
//   max200: (v: string) => !v || v.length <= 200 || 'Maximum of 200 characters is allowed.',
//   email: (v: string) => !v || emailPattern.test(v) || 'Invalid e-mail.',
//   phone: (v: string) => !v || phonePattern.test(v) || 'e.g. 0412345678 / 0740001234',
//   name: (v: string) => !v || namePattern.test(v) || 'Invalid name.',
//   user: (v: string) =>
//     !v || userPattern.test(v) || 'A username must only contain English letters, numbers, and underscores (_).',
//   password: (v: string) =>
//     !v ||
//     passwordPattern.test(v) ||
//     'A password must contain at least one: uppercase letter, lowercase letter, number, and symbol (!@#$%&_).',
//   passphrase: (v: string) =>
//     !v ||
//     passphrasePattern.test(v) ||
//     'A passphrase cannot begin or end with a space, and can contain letters, numbers, spaces, and symbols (!@#$%&_,.).',
//   currency: (v: string) => !v || currencyPattern.test(v) || 'Amount must be only numbers. e.g. 14.35',
//   website: (v: string) => !v || urlPattern.test(v) || 'Invalid website address.',
// }

export const required = (v: string) => (!!v.length ? '' : 'This is required')
export const isEmail = (v: string) => (!!v && emailPattern.test(v) ? '' : 'Invalid e-mail.')
