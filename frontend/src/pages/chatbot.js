import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css"; // Chatbot CSS

function ChatbotWithSidebar({ t }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // clear input

    try {
      const res = await axios.post("https://safion-app.onrender.com/api/chatbot", { message: input });
      const replyText = res.data.reply?.replace(/\n/g, "<br/>") || "⚠️ No reply";
      const botMessage = { sender: "bot", text: replyText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Frontend Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Could not get response." },
      ]);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar">
  <h2 className="logo">Safion</h2>
  <ul className="menu">
            <li onClick={() => navigate("/dashboard")}>{("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{("Report Incident")}</li>
            <li onClick={() => navigate("/news")}>{("Live News")}</li>
            <li onClick={() => navigate("/full-map")}>{("Map")}</li>
            <li onClick={() => navigate("/sos")}>{("Emergency Contacts")}</li>
            <li className="active" onClick={() => navigate("/chatbot")}>{("AI Assistant")}</li>
            <li onClick={() => navigate("/instructions")}>{("Instructions")}</li>
            <li onClick={() => navigate("/settings")}>{("Settings")}</li>
            <li onClick={() => navigate("/login")}>{("Logout")}</li>
          </ul>
</aside>


      {/* Chatbot Area */}
      <main style={{ flex: 1, padding: "20px", overflow: "auto", background: "#f0f2f5" }}>
        <div className="chat-container">
          <div className="chat-header">Safety Assistant Chatbot</div>
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatbotWithSidebar;