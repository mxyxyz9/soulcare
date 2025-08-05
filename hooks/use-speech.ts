"use client"

import { useState, useEffect, useCallback } from "react"

export function useSpeech() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false)

  // Check if speech recognition and synthesis are available
  useEffect(() => {
    const speechRecognitionAvailable = "SpeechRecognition" in window || "webkitSpeechRecognition" in window
    const speechSynthesisAvailable = "speechSynthesis" in window

    setIsSpeechEnabled(speechRecognitionAvailable && speechSynthesisAvailable)
  }, [])

  // Initialize speech recognition
  const recognition = useCallback(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      console.error("Speech recognition not supported in this browser")
      return null
    }

    // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      const current = event.resultIndex
      const result = event.results[current]
      const transcriptText = result[0].transcript
      setTranscript(transcriptText)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    return recognition
  }, [])

  // Start listening
  const startListening = useCallback(() => {
    setTranscript("")
    const recognitionInstance = recognition()
    if (recognitionInstance) {
      recognitionInstance.start()
      setIsListening(true)
    }
  }, [recognition])

  // Stop listening
  const stopListening = useCallback(() => {
    const recognitionInstance = recognition()
    if (recognitionInstance) {
      recognitionInstance.stop()
      setIsListening(false)
    }
  }, [recognition])

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      console.error("Speech synthesis not supported in this browser")
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 1.0
    utterance.pitch = 1.0

    utterance.onstart = () => {
      setIsSpeaking(true)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  return {
    isListening,
    startListening,
    stopListening,
    transcript,
    isSpeaking,
    speak,
    stopSpeaking,
    isSpeechEnabled,
  }
}
