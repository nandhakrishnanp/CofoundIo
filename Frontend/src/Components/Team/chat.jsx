import Navbar from "../Navbar";
import React, { useEffect, useState } from 'react';


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

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{
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


]);

    function handleInputChange(event) {

        setMessage(event.target.value);
        console.log(event.target.value);
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    }


    // Send a message to the team chat room
    function sendMessage(userId, text) {
        const socket = socketClients.find(client => client.id === userId);
        if (socket) {
            socket.emit('message', { sender: userId, text });
        }
    }



    function handleSendMessage() {
        // Send the message using the sendMessage function
        setMessages([...messages, { sender: 'user1', text: message }]);
        //sendMessage('user1', message);
        // Clear the input field
        setMessage('');
    }

    return (
        <>
            <Navbar />
            <div className="relative left-0 md:bottom-0 bottom-10 w-full md:text-ellipsis">
                <div className="overflow-y-scroll">

                    {messages.map((message, index) => (
                        <div key={index} className={`flex m-3 ${message.sender === 'user1' ? 'justify-end' : 'justify-start'}`}>
                            {message.sender !== 'user1' &&  (
                                <img
                                    src={`https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg`} // Replace with the actual profile picture URL
                                    alt={`Profile Picture of ${message.sender}`}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <div className={`p-2 rounded-xl mx-2 ${message.sender === 'user1' ? 'bg-primary text-white' : ' bg-red-500'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex sticky bottom-1 justify-evenly">
                    <input
                        className="w-3/4 border rounded-xl border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onSubmit={handleSendMessage}
                        placeholder="Type your message..."
                    />
                    <button className="bg-primary w-1/5 text-white font-bold py-2 px-4 rounded-lg" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </>
    );
}

export default Chat;