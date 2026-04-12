import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const starterCards = [
  "Explain binary search",
  "Fix React bug",
  "Write a professional email",
  "Give me life advice",
];

const generateId = () => window.crypto?.randomUUID?.() || Date.now().toString();

const createChat = (title = "New chat") => ({
  id: generateId(),
  title,
  messages: [],
});

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedModel, setSelectedModel] = useState("SKY Pro");
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([
    "React interview notes",
    "Backend API ideas",
    "Important SKY prompts",
  ]);
  const [pinnedChats, setPinnedChats] = useState(() => {
    const saved = localStorage.getItem("sky_pins");
    return saved ? JSON.parse(saved) : [];
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sky_sessions");
    return saved ? JSON.parse(saved) : [createChat("Welcome to SKY")];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    const saved = localStorage.getItem("sky_active");
    return saved || null;
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeChat = useMemo(() => {
    return sessions.find((chat) => chat.id === activeChatId) || sessions[0];
  }, [sessions, activeChatId]);

  useEffect(() => {
    if (!activeChatId && sessions[0]) setActiveChatId(sessions[0].id);
  }, [sessions, activeChatId]);

  useEffect(() => {
    localStorage.setItem("sky_sessions", JSON.stringify(sessions));
    localStorage.setItem("sky_active", activeChat?.id || "");
    localStorage.setItem("sky_pins", JSON.stringify(pinnedChats));
  }, [sessions, activeChat, pinnedChats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChatId]);

  const updateChat = (updater) => {
    if (!activeChat) return;
    setSessions((prev) => prev.map((chat) => (chat.id === activeChat.id ? updater(chat) : chat)));
  };

  const streamText = (text, assistantId, chatId) => {
    let i = 0;
    const words = text.split(" ");
    const timer = setInterval(() => {
      if (i >= words.length) {
        clearInterval(timer);
        setLoading(false);
        return;
      }
      const word = words[i];
      setSessions((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === assistantId
                  ? { ...msg, content: msg.content + (msg.content ? " " : "") + word }
                  : msg
              ),
            }
            : chat
        )
      );
      i++;
    }, 24);
  };

  const sendMessage = async (prompt = input) => {
    if (!prompt.trim() || loading || !activeChat) return;

    const userMsg = { id: generateId(), role: "user", content: prompt };
    const assistantId = generateId();

    updateChat((chat) => ({
      ...chat,
      title: chat.messages.length === 0 ? prompt.slice(0, 24) : chat.title,
      messages: [...chat.messages, userMsg, { id: assistantId, role: "assistant", content: "" }],
    }));

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      streamText(data.reply || "Thinking like SKY ✨", assistantId, activeChat.id);
    } catch {
      streamText("Backend connection failed", assistantId, activeChat.id);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const pinChat = (id) => {
    setPinnedChats((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const deleteChat = (id) => {
    setSessions((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length) setActiveChatId(filtered[0].id);
      return filtered.length ? filtered : [createChat("Welcome to SKY")];
    });
  };

  const saveNote = (text) => {
    if (text.trim()) setNotes((prev) => [...prev, text]);
  };

  const CodeBlock = ({ inline, children }) => {
    if (inline) return <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10">{children}</code>;
    return (
      <pre className="rounded-2xl p-4 overflow-x-auto bg-black/20 text-sm">
        <code>{children}</code>
      </pre>
    );
  };

  return (
    <div className={`h-screen flex ${theme === "dark" ? "bg-gradient-to-br from-[#0b1020] via-[#111827] to-[#0f172a] text-white" : "bg-gradient-to-br from-[#f8fbff] via-[#eef6ff] to-[#eaf4ff] text-black"}`}>
      <div className={`transition-all duration-300 border-r ${theme === "dark" ? "bg-[#0b1020]/95 border-white/10" : "bg-white/85 border-[#dbeafe] shadow-sm"} ${sidebarOpen ? "w-[260px]" : "w-[72px]"}`}>
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`hover:scale-110 transition rounded-xl px-2 py-1 ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-50"}`}>☰</button>
            {sidebarOpen && <button onClick={() => setSessions((prev) => [...prev, createChat()])}>✨</button>}
          </div>

          {sidebarOpen && (
            <>
              <div className={`rounded-2xl px-3 py-3 backdrop-blur-md shadow-sm ${theme === "dark" ? "bg-white/5" : "bg-[#f8fbff] border border-[#dbeafe]"}`}>
                <div className="text-sm font-semibold">SKY Workspace</div>
                <div className="text-xs opacity-70 mt-1">Enterprise AI Suite</div>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search chats"
                className={`w-full px-3 py-2 rounded-xl text-sm outline-none ${theme === "dark" ? "bg-white/5" : "bg-[#f8fbff] border border-[#dbeafe]"}`}
              />
              <div className={`rounded-2xl px-3 py-3 ${theme === "dark" ? "bg-white/5" : "bg-[#f8fbff] border border-[#dbeafe]"}`}>
                <div className="text-sm">👤 SKY User</div>
                <div className="text-xs opacity-50 mt-1">Premium Workspace</div>
              </div>
            </>
          )}
        </div>

        <div className="px-3 space-y-2 mt-2 pb-4 pr-2">
          {sessions
            .slice()
            .sort((a, b) => Number(pinnedChats.includes(b.id)) - Number(pinnedChats.includes(a.id)))
            .filter((chat) => chat.title.toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`group px-3 py-2.5 rounded-xl cursor-pointer transition text-sm ${activeChat?.id === chat.id ? "bg-blue-500/15" : theme === "dark" ? "hover:bg-white/8" : "hover:bg-gray-100"}`}>
                {sidebarOpen && (
                  <div className="flex justify-between items-center">
                    <span className="truncate font-medium text-[14px]">💬 {chat.title}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); pinChat(chat.id); }}>{pinnedChats.includes(chat.id) ? "📌" : "📍"}</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}>🗑️</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className={`px-6 py-4 flex justify-between items-center border-b ${theme === "dark" ? "border-white/10 bg-[#0b1020]/70" : "border-gray-200 bg-white/80 shadow-sm"} backdrop-blur-md`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl shadow-sm flex items-center justify-center ${theme === "dark" ? "bg-white/5" : "bg-[#eef6ff]"}`}>🤖</div>
            <div>
              <div className="font-bold text-2xl tracking-wide">SKY ✨</div>
              <div className="text-xs opacity-50">AI Workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className={`px-3 py-2 rounded-xl text-sm outline-none ${theme === "dark" ? "bg-white/5" : "bg-[#eef6ff]"}`}>
              <option>SKY Pro</option>
              <option>SKY Fast</option>
              <option>SKY Deep</option>
            </select>
            <button onClick={() => setShowNotes(!showNotes)}>📒 Notes</button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "🌞" : "🌙"}</button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {showNotes && (
            <div className={`w-[280px] border-r px-4 py-4 ${theme === "dark" ? "bg-[#0f172a]/70 border-white/10" : "bg-white border-gray-200"}`}>
              <div className="font-semibold mb-4 flex justify-between"><span>📒 Saved Notes</span><span>📌</span></div>
              <div className="flex gap-2 mb-3">
                <input value={noteInput} onChange={(e) => setNoteInput(e.target.value)} placeholder="New note" className={`flex-1 px-3 py-2 rounded-xl text-sm outline-none ${theme === "dark" ? "bg-white/5" : "bg-[#f8fbff] border border-[#dbeafe]"}`} />
                <button onClick={() => { saveNote(noteInput); setNoteInput(""); }} className="px-3 rounded-xl bg-blue-600 text-white">+</button>
              </div>
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                {notes.map((note, i) => (
                  <div key={i} onClick={() => { setInput(note); setSelectedNote(note); }} className={`p-3 rounded-xl text-sm flex justify-between items-center ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-[#eef6ff] border border-[#dbeafe]"}`}>
                    <span>{note}</span>
                    <button onClick={(e) => { e.stopPropagation(); setNotes((prev) => prev.filter((_, idx) => idx !== i)); }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-5 space-y-4 flex flex-col items-center">
            <div className="w-full max-w-3xl text-xs opacity-40 mb-1">Today • SKY Workspace</div>
            {activeChat.messages.length === 0 && (
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {starterCards.map((card) => (
                  <div key={card} onClick={() => sendMessage(card)} className={`p-4 rounded-2xl cursor-pointer transition shadow-sm ${theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-white/90 hover:bg-[#f8fbff] border border-[#dbeafe] shadow-sm hover:shadow-md"}`}>{card}</div>
                ))}
              </div>
            )}

            {activeChat.messages.map((msg) => (
              <div key={msg.id} className={`w-full max-w-3xl animate-[fadeIn_.25s_ease] ${msg.role === "user" ? "ml-auto" : ""}`}>
                <div className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mt-1 ${theme === "dark" ? "bg-white/5" : "bg-[#eef6ff]"}`}>🤖</div>}
                  <div className={`rounded-3xl px-4 py-3.5 shadow-md relative max-w-fit min-w-[120px] max-w-[72%] ${msg.role === "user" ? "bg-blue-600 text-white" : theme === "dark" ? "bg-white/5" : "bg-white/95 border border-[#dbeafe] shadow-sm"}`}>
                    {msg.role === "assistant" && (
                      <div className="group">
                        <div className="flex items-center justify-between text-xs opacity-50 mb-2">
                          <span>✨ SKY</span>
                          <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
                    )}
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>{msg.content}</ReactMarkdown>
                    {msg.role === "assistant" && (
                      <div className="flex gap-2 mt-3 opacity-0 hover:opacity-100 transition">
                        <button onClick={() => saveNote(msg.content)} className="text-xs px-2 py-1 rounded-lg">📌 Save to notes</button>
                        <button className="text-xs px-2 py-1 rounded-lg">👍</button>
                        <button className="text-xs px-2 py-1 rounded-lg">👎</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && <div className="flex gap-1 text-blue-400"><span className="animate-bounce">•</span><span className="animate-bounce delay-100">•</span><span className="animate-bounce delay-200">•</span></div>}
            <div ref={messagesEndRef} />
          </main>
        </div>

        {selectedNote && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50" onClick={() => setSelectedNote(null)}>
            <div className={`max-w-md w-full mx-4 rounded-2xl p-5 ${theme === "dark" ? "bg-[#111827]" : "bg-white"}`} onClick={(e) => e.stopPropagation()}>
              <div className="font-semibold mb-3">📒 Note Preview</div>
              <div className="text-sm opacity-80">{selectedNote}</div>
            </div>
          </div>
        )}

        <div className="sticky bottom-0 px-4 md:px-6 pb-6">
          <div className={`max-w-3xl mx-auto rounded-[28px] mt-2 hover:shadow-2xl transition-all duration-300 px-4 py-3 flex gap-3 shadow-xl ${theme === "dark" ? "bg-[#111827]/90 border border-white/10" : "bg-white/95 border border-[#dbeafe] shadow-lg"} backdrop-blur-md`}>
            <textarea
              style={{ minHeight: "24px" }}
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Message SKY..."
              className={`flex-1 bg-transparent resize-none outline-none max-h-40 ${theme === "dark" ? "text-white" : "text-black"}`}
            />
            <button onClick={startListening} className={`w-11 h-11 rounded-full flex items-center justify-center transition shadow-md ${listening ? "bg-red-500/20 text-red-400 scale-105" : theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-[#eef6ff] hover:bg-[#dbeafe]"}`}>{listening ? "🔴" : "🎤"}</button>
            <button onClick={() => sendMessage()} className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 hover:scale-105 transition flex items-center justify-center text-white shadow-md shadow-blue-500/20">➤</button>
          </div>
        </div>
      </div>
    </div>

  );
}



