
import React, { useContext, useEffect } from 'react'
interface ThemeContextProps {
  // Define the properties you want to include in your context
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);
const ThemeProvider : React.FC<{children : React.ReactNode}> = ({children}) => {

    const [theme, setTheme] = React.useState<'light' | 'dark'>(()=>{
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        const defaultTheme = storedTheme || 'light';
        if (defaultTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        return defaultTheme;
    });

    const toggleTheme = () => {
        setTheme((prevTheme)=>{
            const newTeme = prevTheme === 'light' ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', newTeme === 'dark');
            return newTeme;
        })

    }

    useEffect(()=>{
        localStorage.setItem('theme', theme);

    },[theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
        <div
        className={`${theme} dark:bg-gray-900 dark:text-gray-100 text-gray-900 bg-white min-h-screen`}
        >

      {children}
        </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider