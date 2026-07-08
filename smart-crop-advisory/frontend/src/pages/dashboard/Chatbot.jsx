import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

// This page implements a simple chat interface backed by the Gemini AI chatbot.
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Load past chat history when the page opens
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/chat/history");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion("");
    setSending(true);

    try {
      const res = await api.post("/chat", { question: currentQuestion });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  if (loadingHistory) return <LoadingSpinner text="Loading chat history..." />;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader title="AI Farming Chatbot" subtitle="Ask anything about crops, diseases, fertilizers, or farming techniques" />

      {/* Chat messages area */}
      <div className="app-card flex-1 overflow-y-auto p-6 mb-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
            <Bot className="w-10 h-10" />
            <p className="text-sm">Ask your first farming question below!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="space-y-3">
              {/* User question bubble */}
              <div className="flex justify-end gap-2">
                <div className="bg-primary-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-lg text-sm">
                  {msg.question}
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
              </div>

              {/* AI answer bubble */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-earth-100 dark:bg-earth-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-earth-600" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-lg text-sm whitespace-pre-line text-gray-700 dark:text-gray-200">
                  {msg.answer}
                </div>
              </div>
            </div>
          ))
        )}
        {sending && <LoadingSpinner text="AgriBot is thinking..." />}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your farming question here..."
          className="input-field flex-1"
        />
        <button type="submit" disabled={sending} className="btn-primary flex items-center gap-2 px-6">
          <Send className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
