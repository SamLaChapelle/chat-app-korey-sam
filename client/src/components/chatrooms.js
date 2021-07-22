import { useState, useEffect } from "react"


function ChatRooms({ user }) {

let room = document.location.pathname.split("/").splice(-1)[0]

const [roomData, setRoomData] = useState(null)

useEffect(() => {
  if(!roomData) {
    fetch(`/chatrooms/${room}`)
      .then((res) => res.json())
      .then((obj) => {
          console.log(obj)
      })
  }
}, [])

    return (
        <div id="chatroom">
            <h1 id="chatroomTitle">TITLE</h1>
            { user ? <h1>{user}</h1> : <h1 id="userTitle">Hi user</h1>}
            <div id="chatbox">
                <button>REFRESH</button>
                {/* <p>{roomData}</p> */}
                <form action={`/chatrooms/${room}`} method="POST">
                    <input type="hidden" name="username" value={user ? user : ""} />
                    <input id="textBox" type="text" name="message" placeholder="Enter your message here..."/>
                    <input type="submit" value="Enter"/>
                </form>
            </div>
        </div>
    )
}

export default ChatRooms