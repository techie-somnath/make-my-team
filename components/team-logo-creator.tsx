"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import Sidebar from "./sidebar";
import TeamMemberCard from "./team-member-card";
import Link from "next/link";
import { useEmployeeData } from "@/app/data-context";

type MessageType = "user" | "system";

type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
};

type HistoryItem = {
  id: string;
  prompt: string;
  timestamp: Date;
};

type TeamMember = {
  employeeId: string;
  name: string;
  skills: string[];
  yearsOfExperience: number;
  designation: string;
  certifications: string[];
  pastProjects: string[];
  availability: string;
};

type TeamData = {
  currentTeam: TeamMember[];
  specializedTeam: TeamMember[];
};

export default function TeamLogoCreator(props: any) {
  const [isListening, setIsListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [TeamData, SetTeamData] = useState<any | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { employee, SetEmployees,history,setHistory } = useEmployeeData();
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join("");

          setPrompt(transcript);

          if (inputRef.current) {
            inputRef.current.focus();
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        if (isListening) {
          recognition.start();
        }

        return () => {
          recognition.stop();
        };
      } else {
        console.log("Speech recognition not supported");
      }
    }
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleSubmit = (e: React.FormEvent) => {
    handleButtonClick();
    e.preventDefault();

    if (prompt.trim()) {
      const timestamp = new Date();
      const id = Date.now().toString();

      // Add to messages
      const newMessage: Message = {
        id,
        content: prompt.trim(),
        type: "user",
        timestamp,
      };

      setMessages((prev) => [...prev, newMessage]); // Append to the end

      // Add to history sidebar
      const newHistoryItem: HistoryItem = {
        id,
        prompt: prompt.trim(),
        timestamp,
      };

      setHistory((prev) => [...prev, newHistoryItem]); // Append to the end

      setPrompt("");
    }
  };

  const handleButtonClick = async () => {
    if (!prompt) {
      alert("Please Enter a Prompt");
      return;
    }
    console.log("Team is creating");
    try {
      const response = await fetch("http://localhost:3000/api/v1/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);

        // Store the data in localStorage
        SetEmployees(result.data);
        SetTeamData(result.data);

        localStorage.setItem("teamData", JSON.stringify(result.data));
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log("Team Data", employee);
  console.log("History", history);
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <header className="border-b p-4">
        <div
          className="container flex items-center justify-between"
          style={{ margin: "10px" }}
        >
          <button className="md:hidden mr-2" onClick={toggleSidebar}>
            ☰
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="MakeMyTeam Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          history={history}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto mt-28">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                Create your best team
              </h2>

              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-lg p-4 ${
                        message.type === "user"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Render Team Data */}
            {employee && (
              <div className="mt-8">
                {/* Current Team */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2 text-gray-700">
                    Current Team
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {employee.currentTeam.map((member) => (
                      !member.isRejected && <TeamMemberCard key={member.employeeId} member={member} />
                    ))}
                  </div>
                </div>

                {/* Specialized Team */}
                <div>
                  <h3 className="text-lg font-medium mb-2 text-gray-700">
                    Specialized Team
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {employee.specializedTeam.map((member) => (
                     !member.isRejected && <TeamMemberCard key={member.employeeId} member={member} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex items-center rounded-full border overflow-hidden bg-white shadow-sm">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 ${
                    isListening ? "text-red-500" : "text-gray-500"
                  } hover:text-gray-700 focus:outline-none`}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your team requirements..."
                  className="flex-1 py-2 px-4 focus:outline-none"
                />

                <button
                //   onClick={handleButtonClick}
                type="submit"
                  disabled={!prompt.trim()}
                  className="p-3 text-gray-500 hover:text-gray-700 focus:outline-none disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
