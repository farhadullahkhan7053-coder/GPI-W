"use client";

import { useState } from "react";

const fields = [
  ["full_name", "Full Name"],
  ["father_name", "Father Name"],
  ["course", "Course/Trade"],
  ["passing_year", "Passing Year"],
  ["phone", "Phone Number"],
  ["email", "Email Address (Optional)"],
  ["current_status", "Current Job/Status (Optional)"],
  ["organization", "Company/Organization (Optional)"],
  ["city", "City (Optional)"]
];

export default function AlumniForm() {
  const [status, setStatus] = useState("");
  
  async function submit(event) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setStatus("Submitting...");
    const form = Object.fromEntries(new FormData(formEl));
    const res = await fetch("/api/alumni", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(form) 
    });
    setStatus(res.ok ? "Registration submitted for approval." : "Please check the form and try again.");
    if (res.ok) formEl.reset();
  }
  
  return (
    <form 
      onSubmit={submit} 
      className="grid gap-6 rounded-2xl bg-white p-8 shadow-soft border border-slate-100 animate-slide-in-left"
    >
      <div>
        <h2 className="text-2xl font-black text-brand-950 tracking-tight">Alumni Registration</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">Join our alumni directory and stay connected.</p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label]) => (
          <input 
            key={name} 
            name={name} 
            type={name === "email" ? "email" : "text"}
            required={!["email", "current_status", "organization", "city"].includes(name)} 
            placeholder={label} 
            className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
          />
        ))}
      </div>
      
      <textarea 
        name="success_story" 
        rows={4} 
        placeholder="Share your success story or experiences at GPI W (Optional)" 
        className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-medium placeholder-slate-400 focus:border-brand-700 focus:ring-1 focus:ring-brand-700 transition-all" 
      />
      
      <button className="rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-extrabold py-4 transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-brand-700/10">
        Submit Registration
      </button>
      
      {status && (
        <p className={`text-sm font-bold text-center px-4 py-2.5 rounded-lg ${
          status.includes("submitted") ? "bg-brand-50 text-brand-700" : "bg-gold/10 text-brand-950"
        }`}>
          {status}
        </p>
      )}
    </form>
  );
}
