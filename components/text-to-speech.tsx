"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, Square } from "lucide-react"

interface TextToSpeechProps {
  text: string
  label?: string
}

export function TextToSpeech({ text, label = "Read Aloud" }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== "undefined" && !window.speechSynthesis) {
      setSpeechSupported(false)
      return
    }

    // Get available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
    }

    // Load voices immediately if available
    loadVoices()

    // Chrome loads voices asynchronously, so we need to listen for the voiceschanged event
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    // Cleanup function to stop speaking when component unmounts
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    // If already speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)

    // Find a deep male voice that might sound like the requested personalities
    // Priority order for voice selection:
    // 1. US English male voice with "male" in the name
    // 2. Any English male voice
    // 3. Any male voice
    // 4. Default voice

    let selectedVoice = null

    // First try to find a US English male voice
    selectedVoice = availableVoices.find(
      (voice) =>
        voice.lang.includes("en-US") &&
        (voice.name.toLowerCase().includes("male") ||
          voice.name.toLowerCase().includes("guy") ||
          voice.name.toLowerCase().includes("david") ||
          voice.name.toLowerCase().includes("james") ||
          voice.name.toLowerCase().includes("john")),
    )

    // If no US English male voice, try any English male voice
    if (!selectedVoice) {
      selectedVoice = availableVoices.find(
        (voice) =>
          voice.lang.includes("en") &&
          (voice.name.toLowerCase().includes("male") ||
            voice.name.toLowerCase().includes("guy") ||
            voice.name.toLowerCase().includes("david") ||
            voice.name.toLowerCase().includes("james") ||
            voice.name.toLowerCase().includes("john")),
      )
    }

    // If still no voice, try any voice with "male" in the name
    if (!selectedVoice) {
      selectedVoice = availableVoices.find(
        (voice) => voice.name.toLowerCase().includes("male") || voice.name.toLowerCase().includes("guy"),
      )
    }

    // If we found a suitable voice, use it
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    // Adjust speech parameters to sound more like the requested personalities
    utterance.rate = 0.95 // Slightly slower than default
    utterance.pitch = 0.85 // Deeper voice
    utterance.volume = 1.0 // Full volume

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
    }

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  if (!speechSupported) {
    return null
  }

  return (
    <Button variant="outline" size="lg" onClick={speak} className={`font-medium ${isSpeaking ? "bg-red-50" : ""}`}>
      {isSpeaking ? (
        <>
          <Square className="h-4 w-4 mr-2" /> Stop Reading
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4 mr-2" /> {label}
        </>
      )}
    </Button>
  )
}
