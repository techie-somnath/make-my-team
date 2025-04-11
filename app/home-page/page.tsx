"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [requirement, setRequirement] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognitionInstance = new SpeechRecognition();
          recognitionInstance.continuous = true;
          recognitionInstance.interimResults = true;

          recognitionInstance.onresult = (event: any) => {
            let currentTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
              if (event.results[i].isFinal) {
                currentTranscript += event.results[i][0].transcript + " ";
              }
            }
            setRequirement(currentTranscript);
          };

          recognitionInstance.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
          };

          recognitionInstance.onend = () => {
            setIsListening(false);
          };

          setRecognition(recognitionInstance);
        } catch (error) {
          console.error("Error initializing speech recognition:", error);
        }
      } else {
        console.warn("Speech recognition not supported in this browser");
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting recognition", error);
      }
    }
  };

  const handleSearch = () => {
    if (requirement.trim()) {
      // Store the requirement in localStorage to access it on the teams page
      localStorage.setItem("teamRequirement", requirement);
      router.push("/teams");
    } else if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleButtonClick = async () => {
    try {
        router.push("/teams");
      const response = await fetch("http://localhost:3000/api/v1/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "create a team those whose know salesforce",
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
  
        // Store the data in localStorage
        localStorage.setItem("teamData", JSON.stringify(data));
  
        // Redirect to the teams page
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-app-heading mb-8">
        <img
              src="/logo.png"
              alt="MakeMyTeam Logo"
              className="h-12 w-auto"
            />
        </h1>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Specify Your Team Requirements
            </h2>
            <p className="text-muted-foreground mb-6">
              Use voice input or type to describe the team you need for your
              upcoming project.
            </p>

            <div className="mb-6 relative">
              <textarea
                ref={textareaRef}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                placeholder="Example: I need a team of frontend developers having 1-3 years of experience"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              />
              <Button
                onClick={toggleListening}
                className={`absolute bottom-3 right-3 rounded-full p-2 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:bg-primary/90"
                }`}
                size="icon"
                type="button"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex justify-end items-center">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleButtonClick}
                //disabled={!requirement.trim()}
              >
                <Search className="mr-2 h-4 w-4" />
                Find Teams
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
