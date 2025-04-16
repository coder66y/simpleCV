export const simpleCVCacheKey = 'simpleCVCacheData';

export function setLocalStorage<T extends object = Record<string, any>>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value ?? {}));
  } catch (error) {
    console.error('localStorage setItem error', error);
  }
}

export function getLocalStorage<T extends Record<string, any> = Record<string, any>>(
  key: string
): T {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (error) {
    console.error('localStorage getItem error', error);
  }
  return data;
}

/**
 * 缓存简历数据
 * @param key 缓存的key
 * @param value 缓存的value
 */
export function setSimpleCVData<T extends Record<string, any> = Record<string, any>>(
  key: string,
  value: T
) {
  const simpleCVData = getLocalStorage(simpleCVCacheKey);
  const newData = {
    ...simpleCVData,
    [key]: value,
  };
  setLocalStorage(simpleCVCacheKey, newData);
}

/**
 * 获取缓存的简历数据
 * @param key  缓存的key
 * @returns 缓存的value
 */
export function getSimpleCVData<T extends object = Record<string, any>>(key: string): T {
  const simpleCVData = getLocalStorage(simpleCVCacheKey);
  return simpleCVData[key] ?? {};
}
