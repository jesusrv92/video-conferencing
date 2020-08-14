import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './style/theme';
import Home from './components/home/home.component.jsx';
import Join from './components/join/join.component.jsx';
import VideoCall from './components/videoCall/videoCall.component.jsx';

//State managment
import reducer from './utils/reducer';
import initialState from './utils/initialState';
export const Context = React.createContext(null);

function App() {

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  React.useEffect(() => function leaveSession() {
    if (state.session) {
      console.log('Disconnecting')
      state.session.disconnect();
    }
    // eslint-disable-next-line
  },[]);
  
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ state, dispatch }}>
        {
          state.page === "home" ? (
            <Home />
          ): state.page === "join" ? (
            <Join />
          ):(
            <VideoCall />
          )
        }
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
