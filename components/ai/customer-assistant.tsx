"use client";

import { useState, useRef, useEffect } from "react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    sender: "bot",
    text: `Hello! 👋 I am the SAMSOJ Virtual Assistant. How can I assist you with Computer Maintenance, Remote Support, or IT Equipment today?`,
    quickReplies: [
      "Computer Maintenance & Remote IT",
      "Windows 7-11 Setup (From ₦10,000)",
      "Software Installation Setup",
      "How Remote Support Works",
      "Hardware Diagnostics & Cost",
      "Chat with Human",
    ],
  },
];

const knowledgeBase: Record<string, { reply: string; quickReplies?: string[] }> = {
  "computer maintenance & remote it": {
    reply:
      "We specialize in computer maintenance and remote troubleshooting! Services include computer diagnostics, Windows installation, formatting/resetting, software error fixes, system optimization, driver updates, and remote desktop support. You can bring your device to us or we can connect to your PC remotely via AnyDesk/TeamViewer.",
    quickReplies: ["Formatting Price (From ₦10,000)", "How Remote Support Works", "Chat with Human"],
  },
  "windows 7-11 setup (from ₦10,000)": {
    reply:
      "Genuine Windows 7, 8, 10, or 11 Pro installation starts from ₦10,000. It includes custom disk partitioning, complete driver configuration, and setup space for software of different kinds — including PC games, educational software, security & antivirus, system utilities, media players/editors, and office tools.",
    quickReplies: ["Software Installation Setup", "How Remote Support Works", "Chat with Human"],
  },
  "software installation setup": {
    reply:
      "We install and configure software of all kinds for home, school, office, and gaming PCs: 🎮 PC Games, 📚 Educational & E-Learning software, 🛡️ Security & Antivirus protection, ⚙️ System Utilities, 🎥 Media Players & Audio/Video Editors, and 💼 Office & Graphic Design apps.",
    quickReplies: ["Windows 7-11 Setup (From ₦10,000)", "Chat with Human"],
  },
  "how remote support works": {
    reply:
      "With Remote Support, you do NOT need to travel! We connect securely to your PC online using AnyDesk or TeamViewer with your permission. We troubleshoot software errors, printer drivers, virus popups, and slow performance while you watch on your screen in real time.",
    quickReplies: ["Get Remote Support Now", "Chat with Human"],
  },
  "get remote support now": {
    reply:
      "Click below to launch an instant WhatsApp chat with our lead technician so we can connect to your PC remotely!",
    quickReplies: ["Chat with Human"],
  },
  "hardware diagnostics & cost": {
    reply:
      "Hardware repair prices depend on: 1) Your PC specifications, 2) Severity of the fault, 3) Authentic replacement parts required (screen, SSD, battery), and 4) Labor bench time. We provide a transparent diagnosis before starting any repair work.",
    quickReplies: ["Formatting Price (From ₦10,000)", "Chat with Human"],
  },
  "buy laptops & pcs": {
    reply:
      "We offer tested HP, Dell, and Lenovo business laptops as well as customized Core i5/i7 desktop workstations with warranties. You can browse our live catalogue above or request a custom build on WhatsApp!",
    quickReplies: ["Laptops price range", "Custom Desktop Workstation", "Chat with Human"],
  },
  "laptops price range": {
    reply:
      "Our business laptops range from fast Core i5 models (from ₦350,000) to Core i7 high-performance models (₦485,000+). We also have budget student laptops available.",
    quickReplies: ["View Catalog", "Chat with Human"],
  },
  "chat with human": {
    reply:
      "I am connecting you directly with our lead technician and sales consultant on WhatsApp. Click below to start chatting!",
    quickReplies: [],
  },
};

export function CustomerAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    messageCountRef.current += 1;
    const count = messageCountRef.current;

    const userMessage: Message = {
      id: `user-msg-${count}`,
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");

    // Look up in knowledge base
    const lower = query.toLowerCase();
    let botReply =
      "Thank you for your enquiry! For tailored quotations, stock confirmations, or immediate support, please message our support desk on WhatsApp.";
    let quickReplies: string[] = ["Chat with Human", "Buy Laptops & PCs", "Book Computer Repair"];

    for (const [key, val] of Object.entries(knowledgeBase)) {
      if (lower.includes(key) || key.includes(lower)) {
        botReply = val.reply;
        quickReplies = val.quickReplies || [];
        break;
      }
    }

    setTimeout(() => {
      messageCountRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-msg-${messageCountRef.current}`,
          sender: "bot",
          text: botReply,
          quickReplies,
        },
      ]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
          aria-label="Open AI Customer Assistant"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-primary-foreground/20 text-sm">
            🤖
          </span>
          <span className="text-sm font-bold tracking-tight">
            Need Help? Ask AI
          </span>
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="flex h-[490px] w-[350px] sm:w-[390px] flex-col rounded-3xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-5 duration-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/20 text-lg">
                🤖
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">SAMSOJ AI Support</p>
                <p className="text-[11px] text-primary-foreground/75 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Instant Answers
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-8 items-center justify-center rounded-full text-primary-foreground/80 hover:bg-primary-foreground/20"
              aria-label="Close Assistant"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-sm"
                      : "bg-background border border-border/80 text-foreground rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* Quick replies */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.quickReplies.map((qr) => (
                      <button
                        key={qr}
                        type="button"
                        onClick={() => handleSend(qr)}
                        className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp Escalation Banner */}
          <div className="border-t border-border/60 bg-background/90 px-4 py-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Prefer direct human chat?</span>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-whatsapp hover:underline inline-flex items-center gap-1"
            >
              <span>💬</span> WhatsApp Agent
            </a>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-border bg-card p-3 flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about laptops, repairs, prices..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Button size="sm" type="submit" className="rounded-xl px-3 text-xs">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
