"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Declare SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true

      recognitionInstance.onresult = (event) => {
        let currentTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + " "
          }
        }
        setTranscript(currentTranscript)
      }

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop()
      setIsListening(false)
    } else {
      try {
        recognition?.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting recognition", error)
      }
    }
  }

  const handleSubmit = () => {
    if (transcript.trim()) {
      // In a real app, you would store this in state or context
      localStorage.setItem("teamRequirement", transcript)
      router.push("/teams")
    }
  }

  return (
    <main className="min-h-screen bg-app-bg text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-app-heading mb-8">Voice Input</h1>

        <Card className="max-w-2xl mx-auto shadow-lg bg-[#161a3d]">
          <CardContent className="p-6">
            <div className="flex justify-center mb-8">
              <Button
                onClick={toggleListening}
                className={`rounded-full p-6 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
            </div>

            <div className="mb-6 p-4 bg-[#1c2045] rounded-md min-h-[150px] border border-gray-600">
              <p className="text-white">{transcript || "Speak your team requirements..."}</p>
            </div>

            <div className="text-center text-sm text-gray-300 mb-6">
              {isListening ? "Listening..." : "Click the microphone to start speaking"}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={!transcript.trim()}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
