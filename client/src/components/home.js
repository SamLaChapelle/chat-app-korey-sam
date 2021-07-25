//importing Link 
import { Link } from "react-router-dom"
//main function Home with destructuring props from app function
function Home({ user, setUser, setCookie }) {

//handleSubmit function passing through the evt from the home page form
  function handleSubmit(evt) {
    //preventing default page refresh
    evt.preventDefault();
    //setting the user state to the user input name
    setUser(evt.target.username.value)
    //setting the cookie state to the inputted userName
    setCookie("name", evt.target.username.value, { path: "/" })
    evt.target.username.value = ""
  }
    //return housing Home page title, welcome message, username form and chat room buttons
    return (
            <div>
              <header>
                <h1 id="mainTitle">!CHAT ROOM</h1>
                {/* Welcome message in a ternary to set the message depending if user state has been set or not */}
                <h1 className="mainInputTitles">{ user ? "Welcome " + user + ", Enter a new username or select a room" : "ENTER A USERNAME:"}</h1>
                {/* home page form with an onSubmit calling the handleSubmit function */}
                <form id="mainForm" onSubmit={handleSubmit}>
                  {/* username text input box and submit button */}
                  <input type="text" name="username" placeholder="Username"/>
                  <input type="submit" value="Submit"/>
                </form>
                {/* chat rooms title and buttons linked to their respective chat rooms as well with a ternary handling disabled depending on if user state has been set */}
                <h1 className="mainInputTitles">CHAT ROOMS: </h1>
                <Link to="/chatrooms/main"><button className="homeButtons" disabled={ user ? false : true} >Main</button></Link>
                <Link to="/chatrooms/music"><button className="homeButtons" disabled={ user ? false : true} >Music</button></Link>
                <Link to="/chatrooms/videogames"><button className="homeButtons" disabled={ user ? false : true} >Video Games</button></Link>
              </header>
            </div>
    )
}
//exporting default Home function
export default Home