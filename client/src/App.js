import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-500 to-blue-400">
      {!showChat ? (
        <div className="container min-h-screen flex items-center justify-center">
          <div className="flex flex-col px-16 py-24 bg-white bg-opacity-20 rounded-lg shadow-xl backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white pb-8 text-center uppercase">
              Join A Chat
            </h3>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Your Name..."
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                className="py-2 px-4 bg-white/70 rounded-full shadow-md text-purple-900 active:outline-none focus:outline-none"
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                className="py-2 px-4 bg-white/70 rounded-full shadow-md text-purple-900 active:outline-none focus:outline-none"
              />
            </div>
            <button
              onClick={joinRoom}
              className="mt-10 py-2 px-6 text-center bg-white/70 rounded-full font-bold text-purple-500/80 hover:text-purple-500 shadow-md active:outline-none focus:outline-none"
            >
              Join A Room
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
