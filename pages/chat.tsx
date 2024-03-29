import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    // State to store the messages
    const [messages, setMessages] = useState<string[]>([]);
    // State to store the current message
    const [currentMessage, setCurrentMessage] = useState('');
    const socket = io();

    useEffect(() => {
        // Create a socket connection
        const socket = io();

        // Listen for incoming messages
        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        // Send the message to the server
        socket.emit('message', currentMessage);
    };

    return (
        <div>
            {/* Display the messages */}
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            {/* Input field for sending new messages */}
            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />

            {/* Button to submit the new message */}
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;