import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { backend } from 'declarations/backend';
import botImg from '/bot.svg';
import userImg from '/user.svg';
import '/index.css';

const App = () => {
  const [chat, setChat] = useState([
    {
      system: { content: "Olá! Eu sou a ICPedia. Como posso te ajudar a entender o Internet Computer hoje?" }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const formatDate = (date) => {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const askAgent = async (messages) => {
    try {
      const response = await backend.chat(messages);
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        newChat.push({ system: { content: response } });
        return newChat;
      });
    } catch (e) {
      console.log(e);
      const eStr = String(e);
      const match = eStr.match(/(SysTransient|CanisterReject), \\+"([^\\"]+)/);
      if (match) {
        alert(match[2]);
      }
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        return newChat;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      user: { content: inputValue }
    };
    const thinkingMessage = {
      system: { content: 'Thinking ...' }
    };
    setChat((prevChat) => [...prevChat, userMessage, thinkingMessage]);
    setInputValue('');
    setIsLoading(true);

    const messagesToSend = chat.slice(1).concat(userMessage);
    askAgent(messagesToSend);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex min-h-screen items-center justify-center icpedia-bg-primary p-4">
      <div className="flex h-[80vh] w-full max-w-2xl flex-col rounded-lg icpedia-bg-secondary shadow-lg">
        {/* Header com título e subtítulo */}
        <div className="icpedia-bg-secondary p-6 border-b border-gray-200 rounded-t-lg">
          <h1 className="text-3xl font-bold icpedia-text-primary mb-2">ICPedia</h1>
          <p className="icpedia-text-secondary">Sua enciclopédia amigável para o Internet Computer.</p>
        </div>
        <div className="flex-1 overflow-y-auto icpedia-bg-primary p-4" ref={chatBoxRef}>
          {chat.map((message, index) => {
            const isUser = 'user' in message;
            const img = isUser ? userImg : botImg;
            const name = isUser ? 'User' : 'System';
            const text = isUser ? message.user.content : message.system.content;

            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
                {!isUser && (
                  <div
                    className="mr-2 h-10 w-10 rounded-full"
                    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
                  ></div>
                )}
                <div className={`max-w-[70%] rounded-lg p-3 ${isUser ? 'icpedia-user-message icpedia-text-primary' : 'icpedia-bot-message shadow'}`}>
                  <div
                    className={`mb-1 flex items-center justify-between text-sm ${isUser ? 'icpedia-text-secondary' : 'icpedia-text-secondary'}`}
                  >
                    <div>{name}</div>
                    <div className="mx-2">{formatDate(new Date())}</div>
                  </div>
                  <div>{text}</div>
                </div>
                {isUser && (
                  <div
                    className="ml-2 h-10 w-10 rounded-full"
                    style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
        <form className="flex rounded-b-lg border-t icpedia-bg-secondary p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 rounded-l border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 icpedia-text-primary"
            placeholder="Pergunte algo sobre o ICP... (ex: O que é um canister?)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-r icpedia-accent p-2 text-white hover:icpedia-accent-hover disabled:bg-blue-300"
            disabled={isLoading}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
