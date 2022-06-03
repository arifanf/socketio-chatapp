import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="flex flex-row w-[700px] h-[500px]">
        <div className="bg-white/50 backdrop-blur-lg py-6 px-8 rounded-l-md w-[230px]">
          <div className="flex flex-row space-x-2 items-center">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <p className="text-purple-900 font-bold text-lg">Live Chat</p>
          </div>
          <div className="flex flex-col space-y-6 py-8 px-4">
                <div className="flex flex-col items-center backdrop-blur-lg py-5 rounded-md shadow-lg bg-blue-500/60">
                  <div className="text-sm font-semibold text-purple-100 ">You</div>
                  <div className="pt-6 pb-2"><img src="./avatar-default.png" alt="" className="w-10 rounded-full"></img></div>
                  <div className="text-sm font-semibold text-purple-100 uppercase">{username}</div>
                </div>
            
          </div>
        </div>
        <div className="flex flex-col min-w-[450px] bg-white/30 backdrop-blur-lg p-8 rounded-r-md">
          <div className="py-4">
            <ScrollToBottom className="overflow-y-content h-[360px]">
              {messageList.map((messageContent) => {
                return (
                  <div
                    className={`flex flex-col w-full ${
                      username === messageContent.author
                        ? "items-start"
                        : "items-end"
                    }`}
                  >
                    <div className={`px-3 py-1 mt-2 rounded-full w-fit mb-[3px] shadow-md ${username === messageContent.author ? 'bg-blue-300/60' : 'bg-purple-300/60'}`}>
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="flex flex-row space-x-2 text-xs px-1">
                      <div>{messageContent.time}</div>
                      <div>{messageContent.author}</div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="relative">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
              className="mt-4 py-2 px-4 bg-white/70 rounded-full shadow-md text-purple-900 w-full active:outline-none focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
