import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './style/theme';
import Home from './components/home/home.component.jsx';
import Join from './components/join/join.component.jsx';

function App() {

  const page = "join"

  return (
    <ThemeProvider theme={theme}>
      {
        page === "home" ? <Home/> : <Join/>
      }
    </ThemeProvider>
  );
}

export default App;
