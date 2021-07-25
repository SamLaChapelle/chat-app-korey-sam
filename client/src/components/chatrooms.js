import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// passing in user data as destructured prop
function ChatRooms({ user }) {
  // grabbing room name info from url and assigning to variable for use in several places
  let room = document.location.pathname.split("/").splice(-1)[0];
  // setting up state for holding data about the current room
  const [roomData, setRoomData] = useState(null);
  // array to compare against for displaying room name
  let roomARR = ["Main", "Video Games", "Music"];
  // user effect that will reload info every 10 seconds for updated messages from other users
  useEffect(() => {
    let timer1 = setInterval(() => {
      // setRoomData back to null to call fetch again
      setRoomData(null);
      // every 10 seconds
    }, 10000);
    // return statement that will only call upon unmount so we don't have endless timers running
    return () => {
      clearInterval(timer1);
    };
  }, []);
  // use effect for fetching message data
  useEffect(() => {
    // checking to make sure we don't run an infinite loop
    if (!roomData) {
      // fetch data based on url
      fetch(`/chatrooms/${room}`)
        .then((res) => res.json())
        .then(setRoomData);
    }
    // adding dependency for calling use effect any time room data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  return (
    // div to hold the whole page as a flexbox and format
    <div id="chatroom">
      {/* chat room title which displays name based off url with link back to home */}
      <Link to="/">
        <h1 id="chatroomTitle">{room.toUpperCase()}</h1>
      </Link>
      {/* div to hold all relevant chat parts */}
      <div id="chatbox">
        <div id="chatContainer">
          {/* display user's name at top of chat if there is a name, otherwise, hey user */}
          {user ? (
            <h1 id="userTitle">{user}</h1>
          ) : (
            <h1 id="userTitle">Hi user</h1>
          )}
          {/* separating username from rest of content */}
          <div id="content">
            {/* holding all messages */}
            <div id="messages">
              {/* make sure there's room data to map over */}
              {roomData ? (
                // for each message in db
                roomData.map((message, index) => (
                  // container for procedurally message data
                  <div className="message" key={index}>
                    {/* displaying username and text info */}
                    <div style={{ display: "flex" }}>
                      <h6 style={{ fontSize: "1rem" }}>{message.author}:</h6>
                      <p style={{ paddingLeft: ".5rem", width: "22rem"}}>{message.body}</p>
                    </div>
                    {/* shows time message was created */}
                    <p>{message.time.slice(0, 16).replace("T", " - ")}</p>
                  </div>
                ))
              ) : (
                // if no message data, loading...
                <p>Loading...</p>
              )}
            </div>
            {/* for displaying other chat rooms */}
            <div id="chatList">
              <p>Other Rooms:</p>
              {/* map over room names array and display names that are not the current room */}
              {roomARR.map((roomName, index) =>
              // if current room, don't display
                roomName.toLowerCase().replace(" ", "") === room ? null : (
                  // link to room
                  <Link
                    to={`/chatrooms/${roomName.replace(" ", "").toLowerCase()}`}
                  >
                    {/* on click to set room data back to null to grab new room info */}
                    <button key={index} onClick={() => setRoomData(null)}>
                      {roomName}
                    </button>
                  </Link>
                )
              )}
            </div>
          </div>
          {/* message form for user message input */}
          <form id="messageForm" action={`/chatrooms/${room}`} method="POST">
          {/* submitting user name for form entry sent to database */}
            <input type="hidden" name="username" value={user ? user : "user"} />
            {/* submitting user message */}
            <input
              id="textBox"
              type="text"
              name="message"
              placeholder="Enter your message here..."
            />
            {/* submit enter button */}
            <input id="enterButton" type="submit" value="Enter" />
          </form>
          {/* refresh button to see new messages if there are any by setting data back to null */}
          <button id="refreshButton" onClick={() => setRoomData(null)}>
            REFRESH
          </button>
        </div>
      </div>
    </div>
  );
}
//exporting default function ChatRooms
export default ChatRooms;
