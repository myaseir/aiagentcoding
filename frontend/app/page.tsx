"use client";

import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function GlaciaAssistant() {
  const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const statusRef = useRef(status);
  const aiSpeechStartTimeRef = useRef<number>(0);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateStatus = (newStatus: typeof status) => {
    statusRef.current = newStatus;
    setStatus(newStatus);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => updateStatus("listening");

    recognition.onresult = (event: any) => {
      const resultIndex = event.results.length - 1;
      const result = event.results[resultIndex];
      const text = result[0].transcript;
      const confidence = result[0].confidence;

      setTranscript(text);

      // --- 1. BARGE-IN LOGIC (Level 3 Ducking/Confidence) ---
      if (statusRef.current === "speaking") {
        const timeSinceStart = Date.now() - aiSpeechStartTimeRef.current;
        // If confidence is high, it's a real person, not an echo
        if (confidence > 0.92 && timeSinceStart > 800) {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
          updateStatus("listening");
        }
        return;
      }

      // --- 2. FAST-RESPONSE LOGIC (Silence Detection) ---
      if (statusRef.current === "listening" && text.trim().length > 0) {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

        // We trigger the backend after 700ms of silence instead of waiting for the browser
        silenceTimerRef.current = setTimeout(() => {
          if (text.trim().length > 2) {
            handleBackendCommunication(text);
          }
        }, 700); 
      }
    };

    recognition.onerror = () => {
      if (statusRef.current === "listening") setTimeout(() => startListening(), 500);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleBackendCommunication = async (text: string) => {
    // Clear timer and stop recognition to prevent double-firing
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    updateStatus("processing");
    
    try {
      const params = new URLSearchParams({ user_input: text });
      const response = await fetch(`http://localhost:8000/api/v1/assistant/chat?${params}`, {
        method: "POST",
        headers: { "x-session-id": "yasir_production_session" },
      });

      if (!response.ok) throw new Error();

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      
      audio.volume = 0.7; // Volume Ducking
      audioRef.current = audio;

      updateStatus("speaking");
      aiSpeechStartTimeRef.current = Date.now();

      audio.onended = () => {
        URL.revokeObjectURL(url);
        audioRef.current = null;
        if (statusRef.current === "speaking") updateStatus("listening");
      };

      await audio.play();
    } catch (error) {
      updateStatus("idle");
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    try { recognitionRef.current.start(); } catch (e) {}
  };

  return (
    <main className="min-h-screen bg-[#F9F9FB] flex flex-col items-center justify-center px-6 font-sans relative">
      
      {/* Top Brand Marker */}
      <nav className="absolute top-12 w-full flex justify-center pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-black tracking-[0.4em] uppercase text-zinc-400">
            Glacia Systems
          </span>
        </div>
      </nav>

      {/* Main Interface */}
      <div className="max-w-md w-full flex flex-col items-center space-y-16">
        
        <div className="text-center space-y-2">
          <h2 className={`text-4xl font-serif italic transition-all duration-700 ${
            status === 'idle' ? 'text-zinc-300' : 'text-zinc-900'
          }`}>
            {status === "listening" ? "Listening" : 
             status === "processing" ? "Analyzing" : 
             status === "speaking" ? "Responding" : 
             "Standby"}
          </h2>
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
            {status === "idle" ? "Ready to initialize" : "AI Voice Interface Active"}
          </p>
        </div>

        {/* The Hub */}
        <div className="relative group">
          <div className={`absolute inset-[-20px] rounded-full blur-3xl transition-all duration-1000 opacity-20 ${
            status === "listening" ? "bg-rose-400" : 
            status === "speaking" ? "bg-emerald-400" : "bg-zinc-200"
          }`}></div>

          <button
            onClick={() => status === "idle" && (updateStatus("listening"), startListening())}
            className={`relative w-48 h-48 rounded-full bg-white border flex items-center justify-center transition-all duration-700 shadow-2xl ${
              status === "idle" ? "border-zinc-100 hover:scale-105" : "border-transparent scale-110"
            }`}
          >
            <div className="flex gap-1.5 items-center">
              {[0.5, 1, 0.7].map((h, i) => (
                <div key={i} className={`w-1 rounded-full transition-all duration-500 ${
                  status === "listening" ? "bg-rose-500 animate-[bounce_1s_infinite]" :
                  status === "speaking" ? "bg-emerald-500" : "bg-zinc-200"
                }`} style={{ height: status === "listening" ? `${h * 40}px` : "4px", animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </button>
        </div>

        {/* Live Transcript */}
        <div className="text-center max-w-[280px]">
          <p className="text-zinc-400 text-sm leading-relaxed font-light transition-all">
            {transcript ? (
              <span className="text-zinc-800">“{transcript}”</span>
            ) : (
              "The system is trained to filter background noise and own-voice echoes."
            )}
          </p>
        </div>
      </div>

      {/* Professional Footer Badge */}
      <footer className="absolute bottom-10 w-full text-center">
        <span className="text-[9px] font-bold tracking-widest text-zinc-300 uppercase border border-zinc-200/60 px-4 py-1.5 rounded-full">
          Pure Coding Prototype // Build 2026.04
        </span>
      </footer>

    </main>
  );
}