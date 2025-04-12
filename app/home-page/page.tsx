"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import TeamLogoCreator from "@/components/team-logo-creator";

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


  const handleSearch = () => {
    if (requirement.trim()) {
      // Store the requirement in localStorage to access it on the teams page
      localStorage.setItem("teamRequirement", requirement);
      router.push("/teams");
    } else if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

 

  return (
  <TeamLogoCreator />
  );
}
