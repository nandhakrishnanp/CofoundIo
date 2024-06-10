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


    function handleInputChange(event) {
        setMessage(event.target.value);
    }

    // Send a message to the team chat room
    function sendMessage(userId, text) {
        const socket = socketClients.find(client => client.id === userId);
        if (socket) {
            socket.emit('message', { sender: userId, text });
        }
    }

    let messages = [{
        sender: 'user1',
        text: 'Hello team!',
    },
    {
        sender: 'user2',
        text: 'Hi user1!',
    },
    {
        sender: 'user1',
        text: 'How are you?',
    },
    {
        sender: 'user2',
        text: 'I am fine, thank you!',
    },
    {
        sender: 'user1',
        text: 'Great!',
    },
    {
        sender: 'user2',
        text: 'How about you?',
    },
    {
        sender: 'user1',
        text: 'I am doing well too!',
    },

]

    function handleSendMessage() {
        // Send the message using the sendMessage function
        sendMessage('user1', message);
        // Clear the input field
        setMessage('');
    }

    return (
        <>
            <Navbar />
            <div className="fixed left-0 md:bottom-0 bottom-11 w-full z-10">
                <div className="">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'user1' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender !== 'user1' && (
                                <img
                                    src={`profile-pic-${message.sender}.jpg`} // Replace with the actual profile picture URL
                                    alt={`Profile Picture of ${message.sender}`}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div className={`message-bubble ${message.sender === 'user1' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
                                {message.text}
                            </div>
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