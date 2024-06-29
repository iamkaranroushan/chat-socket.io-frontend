"use client";
import React, { useState, useEffect } from "react";
import useSocket from "@/hooks/useSocket";
import Users from "@/components/localComponents/Users";
import ChatWindow from "@/components/localComponents/ChatWindow";
import Navbar from "@/components/localComponents/Navbar";
import { LuMessagesSquare } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";
const Page = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recName, setRecName] = useState("");
  const [roomId, setRoomId] = useState("");
  // Initialize the Socket.IO instance using the custom hook
  const socket = useSocket();

  // Effect hook to set up event listeners when the socket is ready
  useEffect(() => {
    if (socket) {
      // Listen for the "disconnect" event from the server
      socket.on("disconnect", () => {
        console.log(`User disconnected`); // Log a message when the user disconnects
        setSelectedUser(null);
        // setRecName(username);
        setReceiver("");
        setRoomId("");
        setMessages([]);
      });
    }
  }, [socket]); // Dependency array ensures the effect runs when the socket changes

  const startConversation = (recId, username) => {
    console.log(username);
    if (recName !== username) leaveRoom();
    if (socket) {
      socket.emit("startConversation", recId, username);
    }
  };

  const sendMessage = (message, isImage) => {
    if (socket) {
      socket.emit("sendMessage", message, receiver, roomId, isImage);
      console.log(`image ${isImage}`);
    }
  };

  const sendMail = (data) => {
    let subject = data.subject;
    let message = data.mailMessage;
    let to = recipient;
    console.log(
      `subject is : ${subject}, message is ${message}, and sending mail to ${to}`
    );
    if (socket) {
      socket.emit("mailSending", to, subject, message);
      console.log(`mail sent to backend`);
    }
  };

  const getRecipient = (email) => {
    setRecipient(email);
  };

  const leaveRoom = () => {
    if (socket && roomId) {
      console.log(socket, roomId);
      socket.emit("leaveRoom", roomId);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("userLeft", (msg) => {
        console.log(msg);
        setSelectedUser(null);
        // setRecName(username);
        setReceiver("");
        setRoomId("");
        setMessages([]);
        // setShowMailInterface();
      });
    }
    // return () => {
    //   if (socket) {
    //     socket.off("userLeft", handleUserLeft);
    //   }
    // };
  }, [selectedUser, receiver, roomId, messages]);

  useEffect(() => {
    if (socket) {
      // Listen for the conversationStarted event from the server
      socket.on("conversationStarted", (recId, roomId, username) => {
        // console.log(` message to be send ${recId}, ${roomId}`);
        setSelectedUser(username);
        // setRecName(username);
        setReceiver(recId);
        setRoomId(roomId);
      });
    }
  }, [socket,selectedUser, receiver, roomId,]);

  useEffect(() => {
    if (socket) {
      // Listen for the "disconnect" event from the server
      socket.on("receiveMessage", (newMessage) => {
        console.log(`incoming--->`, newMessage);

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);

  console.log(messages, `<---stored`);
  // Render the button component
  return (
    <div>
      <div className="grid grid-cols-12 items-center align-center my-12 ml-12">
        <div className="col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 3xl:col-span-2">
          <Users
            startConversation={startConversation}
            leaveRoom={leaveRoom}
            recName={selectedUser}
            getRecipient={getRecipient}
            selectedUser={selectedUser}
          />
        </div>
        <div className="col-span-6 md:col-span-7 lg:col-span-8 xl:col-span-9 3xl:col-span-10">
          {selectedUser ? (
            <ChatWindow
              leaveRoom={leaveRoom}
              sendMessage={sendMessage}
              messages={messages}
              setMessages={setMessages}
              recName={selectedUser}
              setRoomId={setRoomId}
              sendMail={sendMail}
            />
          ) : (
            <div className="flex flex-col justify-center items-center bg-black/30 h-[90vh]">
              <span className="text-white/50 text-9xl">
                <LuMessagesSquare />
              </span>
              <h1 className="text-white text-4xl">Messages</h1>
              <p className="text-white/50 p-2">
                Select a user to start a conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;

{
  /*<div className=" container mx-auto flex justify-center items-center">
</div>


{openAttach && (
  <div className="container mx-auto gap-2 flex justify-between">
  <div className="flex flex-col p-10 gap-4 items-center rounded-md bg-white/20">
    <Button onClick={handleFileSelect}>
      <IoCameraOutline className="text-lg" />{" "}
    </Button>
  </div>
  <EmojiPicker onEmojiClick={handleEmojiClick} />
</div>
)}

*/
}
