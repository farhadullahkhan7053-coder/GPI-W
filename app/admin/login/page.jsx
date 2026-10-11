"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [message, setMessage] = useState("");
  async function submit(event) {
    event.preventDefault();
    setMessage("Signing in...");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) location.href = "/admin";
    else setMessage("Invalid email or password.");
  }
  return (
    <section className="grid min-h-[70vh] place-items-center bg-brand-50 px-4 py-16">
      <form onSubmit={submit} className="w-full max-w-md rounded-md bg-white p-8 shadow-soft ring-1 ring-slate-100">
        <p className="font-bold text-gold">Secure Admin Login</p>
        <h1 className="mt-2 text-3xl font-black text-brand-900">GTVC Parova</h1>
        <div className="mt-8 grid gap-4">
          <input name="email" type="email" required placeholder="Email" className="rounded-md border-slate-200 text-base" />
          <input name="password" type="password" required placeholder="Password" className="rounded-md border-slate-200 text-base" />
          <button className="rounded-md bg-brand-700 px-5 py-3 font-bold text-white">Login</button>
          {message && <p className="text-sm font-semibold text-brand-700">{message}</p>}
        </div>
      </form>
    </section>
  );
}
