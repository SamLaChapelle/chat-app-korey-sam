import React from "react"
import { useState, useEffect} from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/home"
import ChatRooms from "./components/chatrooms"
import { useCookies } from 'react-cookie'

import './App.css';


function App() {

  const [user, setUser] = useState(null)
  const [cookie, setCookie] = useCookies(["name"])

  useEffect(() => {
    if(cookie){
    setUser(cookie.name)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home user={user} setUser={setUser} setCookie={setCookie} cookie={cookie} />} />
        <Route path="/chatrooms/:room" render={() => <ChatRooms user={user} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;