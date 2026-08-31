import { APP, STORES, DEFAULTS } from './config.js';

let dbPromise;
export function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(APP.dbName, APP.dbVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const name of STORES) if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, {keyPath:'id'});
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

async function withStore(name, mode, action) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(name, mode); const store = tx.objectStore(name);
    let result; try { result = action(store); } catch (e) { reject(e); return; }
    tx.oncomplete = () => resolve(result instanceof IDBRequest ? result.result : result);
    tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
  });
}
export const getAll = name => withStore(name, 'readonly', s => s.getAll());
export const get = (name,id) => withStore(name, 'readonly', s => s.get(id));
export const put = (name,value) => withStore(name, 'readwrite', s => s.put(value));
export const remove = (name,id) => withStore(name, 'readwrite', s => s.delete(id));
export const clear = name => withStore(name, 'readwrite', s => s.clear());

export async function seedIfEmpty() {
  const profile = await get('settings','profile'); if (profile) return false;
  for (const [store, rows] of Object.entries(DEFAULTS)) {
    const values = Array.isArray(rows) ? rows : [rows]; for (const row of values) await put(store, structuredClone(row));
  }
  return true;
}
export async function exportAll() { const data={schemaVersion:APP.dbVersion,exportedAt:new Date().toISOString(),app:APP.name,stores:{}}; for(const s of STORES)data.stores[s]=await getAll(s); return data; }
export function validateBackup(data) { return data && Number.isInteger(data.schemaVersion) && data.schemaVersion<=APP.dbVersion && data.stores && STORES.every(s=>Array.isArray(data.stores[s])); }
export async function restoreAll(data) { if(!validateBackup(data))throw new Error('Unsupported or incomplete backup'); for(const s of STORES){await clear(s); for(const row of data.stores[s])await put(s,row);} }
