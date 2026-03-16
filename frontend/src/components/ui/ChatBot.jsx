import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaUser } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi! I am Ganesh's AI Assistant. Ask me anything about Web Dev!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Agar local pe test kar rahe ho to "http://localhost:5000/api/chat" use karna
      const res = await fetch(
        "https://ganesh-portfolio-api.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // 👇 YAHAN CHANGE KIYA HAI: 'message' ko 'prompt' kar diya taaki backend samajh sake
          body: JSON.stringify({ prompt: userMessage.text }),
        },
      );

      const data = await res.json();

      // Backend se aane wale data me 'reply' variable hai
      if (data.reply) {
        setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "⚠️ Server did not respond correctly.",
            sender: "bot",
            isError: true,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Error connecting to server.",
          sender: "bot",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end font-sans">
      {/* --- GREETING BUBBLE (Hidden on Mobile) --- */}
      {!isOpen && showGreeting && (
        <div
          className="hidden sm:flex mb-4 mr-2 relative animate-bounce hover:animate-none cursor-pointer transition-transform hover:-translate-y-1"
          onClick={() => setIsOpen(true)}
        >
          <div className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-3 rounded-2xl rounded-tr-none shadow-2xl border border-gray-200 flex items-center gap-3 max-w-[260px]">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full text-white shadow-lg">
              <FaRobot size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                AI Assistant
              </p>
              <p className="text-sm font-bold text-gray-800">
                Hey! Need help? 🚀
              </p>
            </div>

            {/* Close 'X' */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreeting(false);
              }}
              className="absolute -top-2 -left-2 bg-gray-200 text-gray-600 rounded-full p-1 hover:bg-red-500 hover:text-white transition shadow-sm"
            >
              <FaTimes size={10} />
            </button>
          </div>
          {/* Triangle Pointer */}
          <div className="absolute bottom-[-6px] right-5 w-4 h-4 bg-white/90 transform rotate-45 border-r border-b border-gray-200"></div>
        </div>
      )}

      {/* --- CHAT WINDOW --- */}
      <div
        className={`transition-all duration-300 transform origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 h-0 w-0"}`}
      >
        <div className="bg-gray-900 border border-gray-700 w-[90vw] sm:w-[350px] md:w-[380px] h-[500px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <FaRobot className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide">
                  Ganesh's AI
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_5px_#4ade80]"></span>
                  <p className="text-blue-100 text-[10px] font-medium">
                    Online
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition transform hover:rotate-90"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-900/95 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="space-y-5">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%]`}>
                    {/* Bot Icon (Left) */}
                    {msg.sender === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0 shadow-sm">
                        <FaRobot className="text-blue-400 text-[10px]" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 text-sm rounded-2xl shadow-md leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : msg.isError
                            ? "bg-red-900/30 text-red-200 border border-red-500/30 rounded-bl-none"
                            : "bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* User Icon (Right) */}
                    {msg.sender === "user" && (
                      <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0 shadow-sm">
                        <FaUser className="text-blue-400 text-[10px]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Animation */}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                      <FaRobot className="text-blue-400 text-[10px]" />
                    </div>
                    <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-700 flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-gray-800 border-t border-gray-700 flex items-center gap-2 shadow-inner">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-gray-900 text-white text-sm rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700 placeholder-gray-500 transition-all"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,99,235,0.5)] transition-all duration-300 transform hover:scale-110 z-[1000] ${
          isOpen
            ? "bg-gray-700 rotate-90"
            : "bg-gradient-to-r from-blue-600 to-purple-600 rotate-0"
        }`}
      >
        {isOpen ? <FaTimes size={22} /> : <FaRobot size={26} />}
      </button>
    </div>
  );
};

export default ChatBot;
