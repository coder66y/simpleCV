import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';
import { colorPrimary } from '@/layouts';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';

/** 主题类型 */
export type  IThemeStoreTypes = {
  templateId: string;
  color: string;
  secondaryColor: string;
  moduleMargin: number;
  lineHeight: number;
  pageMargin: number;
  fontSize: number;
  fontFamily: string;
  language: string;
}

/** 主题dispatch参数类型 */
export type IThemeDispatchArgType = {
  type: string; 
  payload?: Record<string,any>
}

/** 主题dispatch方法 */
export type ThemeDispatchActionType = Dispatch<IThemeDispatchArgType>;

const themeCacheKey = 'themeConfig'

const initState: IThemeStoreTypes = {
  templateId: "1",
  color: '#4e7880',
  moduleMargin: 10,
  secondaryColor: "#999",
  lineHeight: 2,
  pageMargin: 40,
  fontSize: 14,
  fontFamily: 'Microsoft YaHei',
  language: 'zh-CN'
}

/** 主题初始值 */
export const initialTheme = (): IThemeStoreTypes => {
  const cache = getLocalStorage<IThemeStoreTypes>(themeCacheKey)
  if(Object.keys(cache)?.length > 0) {
    return cache
  }
  return initState;
}

const state = initialTheme();

const ThemeContext = createContext<IThemeStoreTypes>(state);

const ThemeDispatchContext = createContext<ThemeDispatchActionType | null>(null);

export function ThemeProvider({ children }: {children: React.ReactNode}) {
  const [theme, dispatch] = useReducer(
    themeReducer,
    state,
    initialTheme,
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

/** 使用主题值 */
export function useTheme() {
  return useContext(ThemeContext);
}

/** dispatch更改主题值 */
export function useThemeDispatch() {
  return useContext(ThemeDispatchContext);
}

/** reducer 方法 */
const themeReducer: Reducer<IThemeStoreTypes, IThemeDispatchArgType> = (theme, action) => {
  switch (action.type) {
    case 'reset': {
      return initState
    };
    case 'changeThemeKey': {
      if(action?.payload?.key) {
        const newState = {
          ...theme,
          [action.payload.key]: action?.payload?.value
        }
        setLocalStorage(themeCacheKey, newState)
        return newState;
      }
      return theme;
    };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
