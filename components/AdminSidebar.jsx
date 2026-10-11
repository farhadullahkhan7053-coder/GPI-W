"use client";

import { BarChart3, Bell, BookOpen, Images, Mail, Settings, UserRound, UsersRound } from "lucide-react";

const items = [
  ["overview", "Overview", BarChart3],
  ["courses", "Courses", BookOpen],
  ["announcements", "Announcements", Bell],
  ["gallery", "Gallery", Images],
  ["alumni", "Alumni", UsersRound],
  ["messages", "Messages", Mail],
  ["settings", "Settings", Settings],
  ["profile", "Profile", UserRound]
];

export default function AdminSidebar({ active, setActive }) {
  return (
    <aside className="rounded-md bg-brand-900 p-3 text-white lg:min-h-[calc(100vh-120px)]">
      <div className="px-3 py-4">
        <p className="text-sm font-bold text-gold">GPIW Admin</p>
        <p className="mt-1 text-xs text-brand-100">Content Management</p>
      </div>
      <nav className="grid gap-1">
        {items.map(([id, label, Icon]) => (
          <button key={id} onClick={() => setActive(id)} className={`flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-bold ${active === id ? "bg-white text-brand-900" : "text-brand-50 hover:bg-white/10"}`}>
            <Icon size={18} /> {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
