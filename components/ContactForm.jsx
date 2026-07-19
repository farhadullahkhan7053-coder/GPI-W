"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  
  async function submit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setStatus("Sending...");
    const form = Object.fromEntries(new FormData(formEl));
    const res = await fetch("/api/contact", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(form) 
    });
    setStatus(res.ok ? "Your message has been sent successfully." : "Please check the form and try again.");
    if (res.ok) formEl.reset();
  }
  
  return (
    <form 
      onSubmit={submit} 
      className="grid gap-5 rounded-2xl bg-white p-8 shadow-soft border border-slate-100 animate-slide-in-right"
    >
      <div>
        <h2 className="text-2xl font-black text-brand-950 tracking-tight">Send Message</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">We'll get back to you as soon as possible.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input 
          name="name" 
          required 
          placeholder="Your Name" 
          className="rounded-xl border border-slate-200 px-4 py-3.5 text-base md:text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
        />
        <input 
          name="email" 
          required 
          type="email" 
          placeholder="Email Address" 
          className="rounded-xl border border-slate-200 px-4 py-3.5 text-base md:text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
        />
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <input 
          name="phone" 
          placeholder="Phone Number (Optional)" 
          className="rounded-xl border border-slate-200 px-4 py-3.5 text-base md:text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
        />
        <input 
          name="subject" 
          required 
          placeholder="Subject" 
          className="rounded-xl border border-slate-200 px-4 py-3.5 text-base md:text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
        />
      </div>
      
      <textarea 
        name="message" 
        required 
        rows={5} 
        placeholder="Type your message here..." 
        className="rounded-xl border border-slate-200 px-4 py-3.5 text-base md:text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
      />
      
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-extrabold py-4 transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-brand-700/10">
        <Send size={18} /> Send Message
      </button>
      
      {status && (
        <p className={`text-sm font-bold text-center px-4 py-2.5 rounded-lg ${
          status.includes("successfully") ? "bg-brand-50 text-brand-700" : "bg-gold/10 text-brand-900"
        }`}>
          {status}
        </p>
      )}
    </form>
  );
}
