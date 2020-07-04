import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './style/theme';
import Home from './components/home/home.component.jsx';
import Join from './components/join/join.component.jsx';
import VideoCall from './components/videoCall/videoCall.component.jsx';

function App() {

  const [ page, setPage] = React.useState('home');

  return (
    <ThemeProvider theme={theme}>
      {
        page === "home" ? <Home setPage={setPage}/> :
        page === "join" ? <Join setPage={setPage}/>
        : <VideoCall setPage={setPage}/>
      }
    </ThemeProvider>
  );
}

export default App;
