import { useState } from 'react';

const MessageInput = ({ onSendMessage }:any) => {
  const [newMessage, setNewMessage] = useState('');
  const handleNewMessageChange = (event:any) => {
    setNewMessage(event.target.value);
  }
  const handleNewMessageSubmit = (event: any) => {
    event.preventDefault();
    onSendMessage(newMessage);
    setNewMessage('');
  };
  return (
    <form className='w-full mb-32 flex flex-col items-center justify-center' onSubmit={handleNewMessageSubmit}>
      <div className="w-3/5">
      <input value={newMessage} onChange={handleNewMessageChange} className="flex h-14 w-full rounded-b-lg px-3 text-sm focus:outline-none focus:bg-gray-100" type="text" placeholder="Type your message…"/>
      </div>
      <button className='mt-10 bg-gray-800 hover:bg-gray-700  text-white font-bold py-3 px-4 border-b-4 rounded-lg w-40' type="submit">Envoyer</button>
    </form>
  );
};

export default MessageInput;
