// src/components/ChatWidget.tsx
// Floating "Ask L'ETO" chat button + panel.
// Talks to /api/chat (never calls the AI provider directly from the browser).
//
// Render this once, near the bottom of your root layout (e.g. in App.tsx),
// so it floats on every page. Import it using a relative path from wherever
// App.tsx lives, for example: import ChatWidget from "./components/ChatWidget";

import { useState, useRef, useEffect, FormEvent } from "react";

type Role = "user" | "assistant";
interface Message {
  role: Role;
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm the L'ETO assistant 🍰 Tell me the occasion, your flavor mood, or your budget, and I'll suggest something from our menu.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data: { reply: string } = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError("Couldn't reach the assistant. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {open && (
        <div className="mb-3 w-80 max-w-[90vw] h-[28rem] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#173A5E] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-semibold leading-tight">Ask L'ETO</p>
              <p className="text-xs text-white/70">Cake recommendations, instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-neutral-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-snug ${
                  m.role === "user"
                    ? "bg-[#173A5E] text-white ml-auto rounded-br-sm"
                    : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-neutral-400 border border-neutral-200 rounded-xl rounded-bl-sm px-3 py-2 text-sm w-fit">
                typing…
              </div>
            )}
            {error && <p className="text-xs text-red-500 px-1">{error}</p>}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-2 border-t border-neutral-200 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Chocolatey cake under Rs. 2000?"
              className="flex-1 text-sm px-3 py-2 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#173A5E]/40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#173A5E] text-white px-4 py-2 rounded-full text-sm disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-[#173A5E] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-105 transition-transform"
        aria-label="Toggle chat"
      >
        {open ? "×" : "🍰"}
      </button>
    </div>
  );
}
