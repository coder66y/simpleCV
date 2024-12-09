export const setLocalStorage = (key: string, value: Record<string, any> = {}) => {
  try {
    localStorage.setItem(key, JSON.stringify(value ?? {}))
  } catch (error) {
    console.error('localStorage setItem error', error)
  }
}

export const getLocalStorage = (key: string) => {
  let data = {}
  try {
    data = JSON.parse(localStorage.getItem(key) || '{}')
  } catch (error) {
    console.error('localStorage getItem error', error)
  }
  return data;
}