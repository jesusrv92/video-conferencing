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

  const [ page, setPage] = React.useState('home');
  const [ video, setVideo ] = React.useState(false);
  const [ micro, setMicro ] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={{ state, dispatch }}>
        {
          state.page === "home" ? (
            <Home />
          ): state.page === "join" ? (
            <Join 
              setPage={setPage}
              video = {video}
              setVideo = {setVideo}
              micro = {micro}
              setMicro = {setMicro}
              users = {users}
              setUsers = {setUsers}
            />
          ):(
            <VideoCall 
              setPage={setPage}
              video = {video}
              setVideo = {setVideo}
              micro = {micro}
              setMicro = {setMicro}
              users = {users}
              setUsers = {setUsers}
            />
          )
        }
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
