import { ThemeProvider } from '../context';

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
