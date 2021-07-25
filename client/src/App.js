//imported React, useState, useEffect, Switch, Route, Browser Router, ChatRooms component & useCookies library
import React from "react"
import { useState, useEffect} from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/home"
import ChatRooms from "./components/chatrooms"
import { useCookies } from 'react-cookie'
//importing CSS stylesheet file
import './App.css';

//Main function App
function App() {
//setting state for user input for userName & cookie to house the userName
  const [user, setUser] = useState(null)
  const [cookie, setCookie] = useCookies(["name"])
//useEffect housing a guard clause checking against if cookie state is true then set the user state to the cookie.name
  useEffect(() => {
    if(cookie){
    setUser(cookie.name)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
//return housing the browser router with a switch and two routes to the home page and procedurally generated chat rooms
  return (
    <BrowserRouter>
      <Switch>
        {/* Home page Route passing user, setUser and setCookie as props */}
        <Route exact path="/" render={() => <Home user={user} setUser={setUser} setCookie={setCookie} />} />
        {/* Chat rooms route passing through user as a prop */}
        <Route path="/chatrooms/:room" render={() => <ChatRooms user={user} />} />
      </Switch>
    </BrowserRouter>
  );
}
//exporting default main function App
export default App;