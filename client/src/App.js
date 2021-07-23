import React from "react"
import { useState, useEffect} from "react"
import { Switch, Route, BrowserRouter, Link } from "react-router-dom"
import Home from "./components/home"
import ChatRooms from "./components/chatrooms"

import './App.css';


function App() {

  const [user, setUser] = useState(null)

  if(document.cookie !== "" && !user ) {
    setUser(document.cookie.slice(9))
  }

  return (
    <BrowserRouter>
      <Switch>
        {console.log(document.cookie)}
        <Route exact path="/" render={() => <Home user={user} setUser={setUser} />} />
        <Route path="/chatrooms/:room" render={() => <ChatRooms user={user} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;