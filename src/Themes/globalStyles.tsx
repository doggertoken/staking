import { createGlobalStyle } from 'styled-components'; 
import { ThemeType } from '../App';

export const GlobalStyles = createGlobalStyle<{theme: ThemeType}>`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }

    body {
        align-items: center;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.textPrimaryLight};
        margin: 0;
        min-height: 100vh;
        padding: 0;
        transition: all 0.25s linear;
    }
 `
