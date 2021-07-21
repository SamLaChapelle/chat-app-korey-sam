import './App.css';

function App() {
  return (
    <div>
      <header>
        <h1 id="mainTitle">!CHAT ROOM</h1>
        <form id="mainForm" action="/main" method="POST">
          <h1 class="mainInputTitles">ENTER A USERNAME:</h1>
          <input type="text" name="userName" placeholder="Username"/>
          <h1 class="mainInputTitles">CHAT ROOM NAME:</h1>
          <input type="text" name="chatRoom" placeholder="Chat Room"/>
          <input type="submit" value="Connect"/>
        </form>
      </header>
    </div>
  );
}

export default App;