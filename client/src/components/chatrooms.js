import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ChatRooms({ user }) {
  let room = document.location.pathname.split("/").splice(-1)[0];

  const [roomData, setRoomData] = useState(null);

  let roomARR = ["Main", "Video Games", "Music"];
  useEffect(() => {
    if (!roomData) {
      fetch(`/chatrooms/${room}`)
        .then((res) => res.json())
        .then(setRoomData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomData]);

  return (
    <div id="chatroom">
      <Link to="/">
        <h1 id="chatroomTitle">{room.toUpperCase()}</h1>
      </Link>
      <div id="chatbox">
        <div id="chatContainer">
          {user ? (
            <h1 id="userTitle">{user}</h1>
          ) : (
            <h1 id="userTitle">Hi user</h1>
          )}
          {roomData ? (
            roomData.map((message, index) => (
              <div id="messages" key={index}>
                <div style={{ display: "flex" }}>
                  <h6 style={{ fontSize: "1rem" }}>{message.author}:</h6>
                  <p style={{ paddingLeft: ".5rem" }}>{message.body}</p>
                </div>
                <p>{message.time.slice(0, 16).replace("T", " - ")}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          <form action={`/chatrooms/${room}`} method="POST">
            <input type="hidden" name="username" value={user ? user : ""} />
            <input
              id="textBox"
              type="text"
              name="message"
              placeholder="Enter your message here..."
            />
            <input type="submit" value="Enter" />
          </form>
          <button id="refreshButton" onClick={() => setRoomData(null)}>
            REFRESH
          </button>
        </div>
        <div>
          <p>Other Rooms:</p>
          {roomARR.map((roomName, index) =>
            roomName.toLowerCase().replace(" ", "") === room ? null : (
              <Link
                to={`/chatrooms/${roomName.replace(" ", "").toLowerCase()}`}
              >
                <button key={index} onClick={() => setRoomData(null)}>
                  {roomName}
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatRooms;
