import { createStore, get, set, getMany, setMany, update, del, clear, keys, values } from 'idb-keyval'

const DB_NAME = 'ghInsightDB'
const STORE_NAME = 'ghInsight'
const STORE = createStore(DB_NAME, STORE_NAME)

export default {
  get: (key: string) => get(key, STORE),
  set: (key: string, val: any) => set(key, val, STORE),
  getMany: (keys: IDBValidKey[]) => getMany(keys, STORE),
  setMany: (entries: [IDBValidKey, any][]) => setMany(entries, STORE),
  update: (key: string, val: any) => update(key, val, STORE),
  remove: (key: string) => del(key, STORE),
  clear: () => clear(STORE),
  keys: () => keys(STORE),
  values: () => values(STORE),
}
