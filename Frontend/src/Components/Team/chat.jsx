import Navbar from "../Navbar";

{// // Import the required dependencies
// import io from 'socket.io';

// // Define the server URL
// const serverUrl = 'http://127.0.0.1:4373';

// // Define the UserIds of the team members
// const userIds = ['user1'];

// // Create a Socket.IO client for each team member
// const socketClients = userIds.map(userId => {
//     // Connect to the server
//     const socket = io(serverUrl);

//     // Emit an event to join the team chat room using the UserId
//     socket.emit('join', { userId });

//     // Handle incoming messages
//     socket.on('message', message => {
//         console.log(`Received message from ${message.sender}: ${message.text}`);
//     });

//     // Return the socket client
//     return socket;
// });

// // Send a message to the team chat room
// function sendMessage(userId, text) {
//     const socket = socketClients.find(client => client.id === userId);
//     if (socket) {
//         socket.emit('message', { sender: userId, text });
//     }
// }

// // Usage example
// sendMessage('user1', 'Hello team!');
}

import React, { useState } from 'react';

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    function handleSendMessage() {
        // Send the message using the sendMessage function
        sendMessage('user1', message);
        // Clear the input field
        setMessage('');
    }

    return (
        <>
            <Navbar />
            <div className="sticky max-md:fixed max-md:left-0 max-md:bottom-11 w-full md:top-0 md:left-0  z-10">
                <div className="">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            <span className="sender">{message.sender}</span>
                            <span className="text">{message.text}</span>
                        </div>
                    ))}
                </div>
                <div className="w-full flex">
                    <input
                        className="w-3/4 border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button className="w-1/4 bg-primary text-white font-bold py-2 px-4 rounded-r" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </>
    );
}

export default Chat;