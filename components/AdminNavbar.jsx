"use client";

import { LogOut } from "lucide-react";

export default function AdminNavbar() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/admin/login";
  }
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-md bg-white p-4 shadow-soft ring-1 ring-slate-100">
      <div>
        <h1 className="text-2xl font-black text-brand-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">Manage website content, registrations, and messages.</p>
      </div>
      <button onClick={logout} className="inline-flex items-center gap-2 rounded-md bg-brand-700 px-4 py-2 font-bold text-white"><LogOut size={18} /> Logout</button>
    </div>
  );
}
