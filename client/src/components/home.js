import { Link } from "react-router-dom"

function Home({ user, setUser, setCookie, cookie }) {


  function handleSubmit(evt) {
    evt.preventDefault();
    setUser(evt.target.username.value)
    setCookie("name", evt.target.username.value, { path: "/" })
    evt.target.username.value = ""
  }

    return (
            <div>
              <header>
                <h1 id="mainTitle">!CHAT ROOM</h1>
                <h1 className="mainInputTitles">{ user ? "Welcome " + user + ", Enter a new username or select a room" : "ENTER A USERNAME:"}</h1>
                <form id="mainForm" onSubmit={handleSubmit}>
                  
                  <input type="text" name="username" placeholder="Username"/>
                  <input type="submit" value="Submit"/>
                </form>
                <h1 className="mainInputTitles">CHAT ROOMS: </h1>
                <Link to="/chatrooms/main"><button className="homeButtons" disabled={ user ? false : true} >Main</button></Link>
                <Link to="/chatrooms/music"><button className="homeButtons" disabled={ user ? false : true} >Music</button></Link>
                <Link to="/chatrooms/videogames"><button className="homeButtons" disabled={ user ? false : true} >Video Games</button></Link>
              </header>
            </div>
    )
}

export default Home