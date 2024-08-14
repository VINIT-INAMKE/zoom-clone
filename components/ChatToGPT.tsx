"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { MessageSquare } from "lucide-react";

const ChatToGpt = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "system", content: "You are chatting with ChatGPT." },
  ]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
        const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, data.message]);
    } catch (error) {
      console.error("Error communicating with ChatGPT:", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button title="Chat with GPT">
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <MessageSquare size={20} className="text-white" />
          </div>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-1/3 bg-dark-1 text-white"
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow p-4 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700">
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-800 border-none rounded text-white"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button
              className="mt-2 w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatToGpt;
