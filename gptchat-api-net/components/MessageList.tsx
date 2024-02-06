const MessageList = ({ messages }:any) => (
  <div className={`flex flex-col flex-grow h-16 w-3/5 p-4 overflow-auto mt-20 bg-slate-800 shadow-xl rounded-t-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 ${messages.length === 0 ? 'items-center justify-center' : ''}`}>
    {messages.length === 0 ? (
      <>
        <div className="text-white text-3xl text-center">Demandez moi quelque chose ci dessous</div>
        <img src="/images/arrow-down.svg" className="arrow" alt="arrow" />
      </>
    ) : (
      messages.map((message:any, index:any) => (
        <div key={index} className={`mt-8 flex ${message.sender === 'user' ? 'justify-end' : ''}`}>
          <div className={`p-2 rounded  ${message.sender === 'user' ? 'bg-gray-500 text-white' : 'bg-gray-300'}`}>
            {message.text}
          </div>
        </div>
      ))
    )}
  </div>
);

export default MessageList;
