export function setLocalStorage<T extends object = object>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value ?? {}))
  } catch (error) {
    console.error('localStorage setItem error', error)
  }
}

export function getLocalStorage<T extends object = object>(key: string): T {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key) || '{}')
  } catch (error) {
    console.error('localStorage getItem error', error)
  }
  return data;
}