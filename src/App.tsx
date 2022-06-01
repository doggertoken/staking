import './App.css';
import { defaultTheme, lightTheme } from './Themes/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Themes/globalStyles';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import Main from './Components/Main'
import React from 'react';

interface Props {
  theme: string;
}

function App() {
  const [theme, setTheme] = React.useState('default');

  const supportedChainIds = [1, 4];

  const connectors = {
    injected: {},
    walletconnect: {}
  }

  return (
    <ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Main theme={theme}/>
      </ThemeProvider>
    </ThirdwebWeb3Provider>
  );
}

export type ThemeType = typeof defaultTheme;
export default App;
