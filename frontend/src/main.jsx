import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import botImg from '/bot.svg';
import userImg from '/user.svg';
import '/index.css';

// Import dinâmico das declarações
let backend;
const loadBackend = async () => {
  try {
    const module = await import('declarations/backend');
    backend = module.backend;
  } catch (e) {
    console.warn('Declarações não encontradas, usando mock para build');
    backend = {
      chat: async () => "Erro: Backend não disponível durante build"
    };
  }
};

const App = () => {
  const [chat, setChat] = useState([
    {
      system: { content: "Olá! Eu sou a ICPedia. Como posso te ajudar a entender o Internet Computer hoje?" }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendLoaded, setBackendLoaded] = useState(false);
  const chatBoxRef = useRef(null);

  // Carregar backend na inicialização
  useEffect(() => {
    loadBackend().then(() => {
      setBackendLoaded(true);
    });
  }, []);

  const formatDate = (date) => {
    const h = '0' + date.getHours();
    const m = '0' + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const askAgent = async (messages) => {
    if (!backendLoaded) {
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        newChat.push({ system: { content: "Carregando backend..." } });
        return newChat;
      });
      setIsLoading(false);
      return;
    }

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
    <div className="flex min-h-screen items-center justify-center icpedia-bg-primary p-2 sm:p-4">
      <div className="flex h-[90vh] sm:h-[80vh] w-full max-w-4xl flex-col rounded-xl icpedia-bg-secondary shadow-2xl">
        {/* Header com título e subtítulo */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white font-bold text-xl">IC</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ICPedia</h1>
              <p className="text-sm text-gray-500 mt-1">Powered by Internet Computer</p>
            </div>
          </div>
          <p className="icpedia-text-secondary flex items-center text-lg">
            <span className="mr-3 text-2xl">📚</span>
            Sua enciclopédia amigável para o Internet Computer.
          </p>
        </div>
        <div className="flex-1 overflow-y-auto icpedia-bg-primary p-4 chat-container" ref={chatBoxRef}>
          {chat.map((message, index) => {
            const isUser = 'user' in message;
            const img = isUser ? userImg : botImg;
            const name = isUser ? 'User' : 'System';
            const text = isUser ? message.user.content : message.system.content;

            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 chat-message`}>
                {!isUser && (
                  <div className="mr-3 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">IC</span>
                  </div>
                )}
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-lg ${isUser ? 'icpedia-user-message icpedia-text-primary border-l-4 border-blue-500' : 'icpedia-bot-message border-l-4 border-purple-500'}`}>
                  <div
                    className={`mb-2 flex items-center justify-between text-xs font-medium ${isUser ? 'icpedia-text-secondary' : 'icpedia-text-secondary'}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{isUser ? '👤' : '🤖'}</span>
                      {name}
                    </div>
                    <div className="text-gray-400">{formatDate(new Date())}</div>
                  </div>
                  <div className="leading-relaxed">{text}</div>
                </div>
                {isUser && (
                  <div className="ml-3 h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <form className="flex rounded-b-xl border-t icpedia-bg-secondary p-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 rounded-l-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 icpedia-text-primary text-sm sm:text-base"
            placeholder="Pergunte algo sobre o ICP... (ex: O que é um canister?)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-r-lg icpedia-accent p-3 text-white hover:icpedia-accent-hover disabled:bg-blue-300 flex items-center justify-center min-w-[80px]"
            disabled={isLoading || !backendLoaded}
          >
            {isLoading ? (
              <div className="loading-pulse">⏳</div>
            ) : !backendLoaded ? (
              <span>Carregando...</span>
            ) : (
              <span>Enviar</span>
            )}
          </button>
        </form>
        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 border-t border-gray-200 rounded-b-xl">
          <p className="text-center text-xs text-gray-500">
            💡 Dica: Pergunte sobre canisters, cycles, Motoko, ou qualquer conceito do ICP!
          </p>
        </div>
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
