import { Link } from "react-router-dom"

function Home({ user, setUser }) {


  function handleSubmit(evt) {
    evt.preventDefault();
    setUser(evt.target.username.value)
    document.cookie = ""
    console.log(document.cookie)
    document.cookie = `username=${user}`
    console.log(document.cookie)
    evt.target.username.value = ""
     
  }

    return (
            <div>
              <header>
                <h1 id="mainTitle">!CHAT ROOM</h1>
                <form id="mainForm" onSubmit={handleSubmit}>
                  <h1 className="mainInputTitles">ENTER A USERNAME:</h1>
                  <input type="text" name="username" placeholder="Username"/>
                  <input type="submit" value="Submit"/>
                </form>
                <h1 className="mainInputTitles">CHAT ROOMS: </h1>
                <Link to="/chatrooms/main"><button disabled={ user ? false : true} >Main</button></Link>
                <Link to="/chatrooms/dogs"><button disabled={ user ? false : true} >Dogs</button></Link>
                <Link to="/chatrooms/cats"><button disabled={ user ? false : true} >Cats</button></Link>
              </header>
            </div>
    )
}

export default Home