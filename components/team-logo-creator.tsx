"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import Sidebar from "./sidebar";
import TeamMemberCard from "./team-member-card";
import Link from "next/link";
import { useEmployeeData } from "@/app/data-context";
import { ParticleCanvas } from "./particle-canvas";
import { femaleImages, maleImages } from "@/lib/team-data";

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
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState("balanced");


  const { employee, SetEmployees, history, setHistory } = useEmployeeData();

  function pickImage(gender: any): any {
    console.log("this is gender", gender);
    let images = gender === "M" ? maleImages : femaleImages;

    // Find the first image that is not used
    const unusedImage = images.find((image) => !image.isUsed);

    if (unusedImage) {
      // Mark the image as used
      unusedImage.isUsed = true;
      return unusedImage.src;
    } else {
      // Return an error if no unused images are available
      return `No unused images available for ${
        gender === "M" ? "Male" : "Female"
      }`;
    }
  }
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  function processEmployeesWithImages(data: any): any {
    return {
      ...data,
      currentTeam: data.currentTeam.map((employee) => {
        // Add an image property to each employee object
        return {
          ...employee,
          image: pickImage(employee.Gender),
        };
      }),
      specializedTeam: data.specializedTeam.map((employee) => {
        // Add an image property to each employee object
        return {
          ...employee,
          image: pickImage(employee.Gender),
        };
      }),
    };
  }

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
  
      // Call handleButtonClick to process the prompt
      handleButtonClick();
    }
  };

  const handleButtonClick = async () => {
    setIsThinking(true); // Start thinking state
    if (!prompt) {
      alert("Please Enter a Prompt");
      setIsThinking(false); // Reset thinking state early if no prompt
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
        SetEmployees(processEmployeesWithImages(result.data));
        SetTeamData(result.data);
        localStorage.setItem("teamData", JSON.stringify(result.data));
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setIsThinking(false); // Reset thinking state after API call finishes
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log("Team Data", employee);
  console.log("History", history);
  console.log("isThinking", isThinking);
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleCanvas />
      </div>
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 pl-24 pr-16 overflow-y-auto mt-28">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center mb-12">
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-white">
                  Let's find your best team
                </h1>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center mt-2">
                Right People, Right Projects, Right Now!
                </p>
              </div>

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
                {isThinking && (
                <div className=" flex flex-col items-center justify-center ">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-300 animate-pulse">Thinking.....</p>
              </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

           {employee &&  <div className="mt-8">
      <div className="px-24">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("balanced")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "balanced"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Balanced Team
          </button>
          <button
            onClick={() => setActiveTab("specialized")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "specialized"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Specialized Team
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "balanced" && (
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Balanced Team
            </h3>
            <span className="text-gray-500">
              based upon skills and immediate availability
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4">
              {employee && employee.currentTeam.map(
                (member) =>
                  !member.isRejected && (
                    <TeamMemberCard
                      key={member.employeeId}
                      member={member}
                      additionalStyles="rounded-lg shadow-md p-4" // Added custom styles
                    />
                  )
              )}
            </div>
          </div>
        )}

        {activeTab === "specialized" && (
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">
              Specialized Team
            </h3>
            <span className="text-gray-500">
              based upon skillset score and availability within ten days
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4">
              {employee && employee.specializedTeam.map(
                (member) =>
                  !member.isRejected && (
                    <TeamMemberCard
                      key={member.employeeId}
                      member={member}
                      additionalStyles="rounded-lg shadow-md p-4" // Added custom styles
                    />
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div> }
          </div>

          <div className="p-6 mb-16  border-t border-gray-100 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto space-y-4"
            >
              <div className="flex items-center rounded-full overflow-hidden shadow-lg bg-transparent">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 transition-colors duration-300 ${
                    isListening ? "text-red-500" : "text-gray-500"
                  } hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100`}
                  aria-label={
                    isListening ? "Stop listening" : "Start listening"
                  }
                >
                  {isListening ? (
                    <MicOff className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your team requirements..."
                  className="flex-1 py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-100"
                  aria-label="Team requirements input"
                />

                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="p-3 text-gray-500 hover:text-blue-600 transition-colors duration-300 focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
