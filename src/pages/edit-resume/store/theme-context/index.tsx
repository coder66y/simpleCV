import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';
import { colorPrimary } from '@/layouts';

/** 主题类型 */
export type  IThemeStoreTypes = {
  color: string;
  secondaryColor: string;
  moduleMargin: number;
  lineHight: number;
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

/** 主题初始值 */
export const initialTheme: IThemeStoreTypes = {
  color: colorPrimary,
  moduleMargin: 10,
  secondaryColor: "#999",
  lineHight: 1,
  pageMargin: 40,
  fontSize: 14,
  fontFamily: 'Microsoft YaHei',
  language: 'zh-CN'
}

const ThemeContext = createContext<IThemeStoreTypes>(initialTheme);

const ThemeDispatchContext = createContext<ThemeDispatchActionType | null>(null);

export function ThemeProvider({ children }: {children: React.ReactNode}) {
  const [theme, dispatch] = useReducer(
    themeReducer,
    initialTheme,
    () => initialTheme,
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
      return initialTheme
    };
    case 'changeThemeKey': {
      if(action?.payload?.key) {
        return {
          ...theme,
          [action.payload.key]: action?.payload?.value
        }
      }
      return theme;
    };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
