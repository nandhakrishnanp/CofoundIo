import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import {allTeams} from "../../Store/projectSlice";
import { UserData, fetchUserDataByID, profileUser } from "../../Store/userSlice";


function ChatNav(props) {
    const [teamName, setTeamName] = useState('Team Name');
    const [teamMembers, setTeamMembers] = useState(['User1', 'User2', 'User3']);


    return (
        <div className="flex sticky justify-start  rounded-xl items-center z-[20] bg-primary text-white">
            <Link to={'/teams'}><IoIosArrowRoundBack className=" text-4xl" /></Link>
            <div className="w-3/4">
                <h1 className="text-2xl m-3 font-bold">{props.teamName}</h1>

            </div>
        </div>
    );

}

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
    const userDetails = useSelector(UserData);
    const teamNames = useSelector(allTeams);
    let teamName = ''
    const {projectId} = useParams();
    console.log(projectId);
    const userName = userDetails.userDetails.userName;
    const [messages, setMessages] = useState([{
        sender: 'StarOne',
        text: 'Hello team!',
    },
    {
        sender: 'user2',
        text: 'Hi user1!',
    },
    {
        sender: 'StarOne',
        text: 'How are you?',
    },
    {
        sender: 'user2',
        text: 'I am fine, thank you!',
    },
    {
        sender: 'StarOne',
        text: 'Great!',
    },
    {
        sender: 'user2',
        text: 'How about you?',
    },
    {
        sender: 'StarOne',
        text: 'I am doing well too!',
    },


    ]);

    console.log(teamNames);
    for (let i = 0; i < teamNames.length; i++) {
        if (teamNames[i].projectId === projectId) {
            teamName = teamNames[i].tittle;
            break;
        }
    }

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



    function handleSendMessage() {
        setMessages([...messages, { sender: userName, text: message }]);
        console.log(userName);
        setMessage('');
    }

    return (
        <div className="h-full w-full">
            <ChatNav teamName={teamName}/>
            <div className=" z-6">
                <div className="overflow-y-scroll snap-y snap-end snap-mandatory">

                    {messages.map((message, index) => (
                        <div key={index} className={`flex z-2 m-3 ${message.sender === userName ? 'justify-end' : 'justify-start'}`}>
                            
                            {message.sender !== userName && (
                                // Displays the name of the messager
                                
                                <img
                                    src={`https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg`} // Replace with the actual profile picture URL
                                    alt={`Profile Picture of ${message.sender}`}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <div className={`p-2 rounded-xl mx-2 ${message.sender === userName ? 'bg-primary text-white' : ' bg-red-500'}`}>
                            {message.sender !== userName && (<div className="text-sm">{message.sender}</div>)}
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-evenly bottom-2 fixed w-full">
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
        </div>
    );
}

export default Chat;