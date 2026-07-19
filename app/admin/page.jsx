"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

const emptyCourse = { title: "", slug: "", duration: "", eligibility: "", short_description: "", full_description: "", skills: "", career_opportunities: "", image: "", status: "published" };
const emptyAnnouncement = { title: "", description: "", category: "General", date: new Date().toISOString().slice(0, 10), is_important: false, status: "published", attachment: "" };
const emptyGallery = { title: "", category: "Campus", image: "" };

export default function AdminPage() {
  const [active, setActive] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          window.location.href = "/admin/login";
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        window.location.href = "/admin/login";
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <p className="text-sm font-bold text-slate-500 animate-pulse">Verifying credentials...</p>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-8">
      <div className="container grid gap-6 lg:grid-cols-[260px_1fr]">
        <AdminSidebar active={active} setActive={setActive} />
        <div>
          <AdminNavbar />
          {active === "overview" && <Overview />}
          {active === "courses" && <CrudManager title="Manage Courses" api="/api/courses" empty={emptyCourse} fields={courseFields} uploadField="image" />}
          {active === "announcements" && <CrudManager title="Manage Announcements" api="/api/announcements" empty={emptyAnnouncement} fields={announcementFields} />}
          {active === "gallery" && <CrudManager title="Manage Gallery" api="/api/gallery" empty={emptyGallery} fields={galleryFields} uploadField="image" />}
          {active === "alumni" && <AlumniManager />}
          {active === "messages" && <MessageManager />}
          {active === "settings" && <SettingsManager />}
          {active === "profile" && <ProfileManager />}
        </div>
      </div>
    </section>
  );
}

function Overview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetch("/api/dashboard").then((r) => r.json()).then((d) => setStats(d.stats)); }, []);
  const cards = stats ? Object.entries(stats) : [];
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{cards.map(([label, value]) => <div key={label} className="rounded-md bg-white p-5 shadow-soft"><p className="text-3xl font-black text-brand-800">{value}</p><p className="mt-2 text-sm font-bold capitalize text-slate-500">{label}</p></div>)}</div>;
}

function CrudManager({ title, api, empty, fields, uploadField, deleteOnly }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const load = () => fetch(`${api}?admin=1`).then((r) => r.json()).then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, [api]);
  async function upload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", uploadField === "image" ? "images" : "files");
    const res = await fetch("/api/upload", { method: "POST", body: data });
    const json = await res.json();
    setForm((old) => ({ ...old, [uploadField]: json.path }));
  }
  async function save(event) {
    event.preventDefault();
    setMessage("Saving...");
    const url = editing ? `${api}/${editing}` : api;
    const res = await fetch(url, { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    setMessage(res.ok ? "Saved successfully." : (json.error || "Save failed."));
    if (res.ok) { setForm(empty); setEditing(null); load(); }
  }
  async function remove(id) {
    if (!confirm("Delete this record?")) return;
    await fetch(`${api}/${id}`, { method: "DELETE" });
    load();
  }
  return (
    <div className="grid gap-6">
      <form onSubmit={save} className="rounded-md bg-white p-6 shadow-soft ring-1 ring-slate-100">
        <h2 className="text-2xl font-black text-brand-900">{title}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {fields.map((field) => <Field key={field.name} field={field} form={form} setForm={setForm} />)}
        </div>
        {uploadField && <input type="file" className="mt-4 block text-sm" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />}
        <button className="mt-5 rounded-md bg-brand-700 px-5 py-3 font-bold text-white">{editing ? "Update" : "Add"} Record</button>
        {message && <span className="ml-4 text-sm font-semibold text-brand-705">{message}</span>}
      </form>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-md bg-white p-4 shadow-soft ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="font-black text-brand-900">{item.title || item.full_name || item.subject}</p><p className="text-sm text-slate-500">{item.category || item.status || item.duration}</p></div>
              <div className="flex gap-2">
                {!deleteOnly && <button onClick={() => { setForm({ ...empty, ...item, date: item.date ? String(item.date).slice(0, 10) : empty.date }); setEditing(item.id); }} className="rounded-md bg-brand-50 px-3 py-2 font-bold text-brand-800">Edit</button>}
                <button onClick={() => remove(item.id)} className="rounded-md bg-red-50 px-3 py-2 font-bold text-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ field, form, setForm }) {
  const value = form[field.name] ?? "";
  const common = { name: field.name, placeholder: field.label, value, onChange: (e) => setForm((old) => ({ ...old, [field.name]: field.type === "checkbox" ? e.target.checked : e.target.value })) };
  if (field.type === "textarea") return <textarea {...common} rows={4} className="rounded-md border-slate-200 md:col-span-2 text-base" />;
  if (field.type === "select") return <select {...common} className="rounded-md border-slate-200 text-base">{field.options.map((o) => <option key={o}>{o}</option>)}</select>;
  if (field.type === "checkbox") return <label className="flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 font-bold text-brand-900"><input type="checkbox" checked={Boolean(value)} onChange={common.onChange} /> {field.label}</label>;
  return <input {...common} type={field.type || "text"} className="rounded-md border-slate-200 text-base" />;
}

const courseFields = [
  { name: "title", label: "Course title" }, { name: "slug", label: "slug-example" }, { name: "duration", label: "Duration" }, { name: "eligibility", label: "Eligibility" },
  { name: "short_description", label: "Short description", type: "textarea" }, { name: "full_description", label: "Full description", type: "textarea" },
  { name: "skills", label: "Skills / outcomes", type: "textarea" }, { name: "career_opportunities", label: "Career opportunities", type: "textarea" }, { name: "image", label: "Image URL" },
  { name: "status", label: "Status", type: "select", options: ["published", "draft"] }
];
const announcementFields = [
  { name: "title", label: "Title" }, { name: "category", label: "Category" }, { name: "date", label: "Date", type: "date" }, { name: "status", label: "Status", type: "select", options: ["published", "draft"] },
  { name: "description", label: "Description", type: "textarea" }, { name: "attachment", label: "Attachment URL" }, { name: "is_important", label: "Important", type: "checkbox" }
];
const galleryFields = [{ name: "title", label: "Image title" }, { name: "category", label: "Category" }, { name: "image", label: "Image URL" }];

function AlumniManager() {
  const [items, setItems] = useState([]);
  const load = () => fetch("/api/alumni").then((r) => r.json()).then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const status = async (id, value) => { await fetch(`/api/alumni/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: value }) }); load(); };
  const remove = async (id) => { await fetch(`/api/alumni/${id}`, { method: "DELETE" }); load(); };
  return <List title="Manage Alumni" items={items} render={(item) => <><button onClick={() => status(item.id, "approved")} className="rounded-md bg-green-50 px-3 py-2 font-bold text-green-700">Approve</button><button onClick={() => status(item.id, "rejected")} className="rounded-md bg-yellow-50 px-3 py-2 font-bold text-yellow-700">Reject</button><button onClick={() => remove(item.id)} className="rounded-md bg-red-50 px-3 py-2 font-bold text-red-700">Delete</button></>} />;
}

function MessageManager() {
  const [items, setItems] = useState([]);
  const load = () => fetch("/api/contact").then((r) => r.json()).then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const update = async (id, status) => { await fetch(`/api/contact/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); load(); };
  const remove = async (id) => { await fetch(`/api/contact/${id}`, { method: "DELETE" }); load(); };
  return <List title="Contact Messages" items={items} render={(item) => <><button onClick={() => update(item.id, item.status === "read" ? "unread" : "read")} className="rounded-md bg-brand-50 px-3 py-2 font-bold text-brand-800">Toggle Read</button><button onClick={() => remove(item.id)} className="rounded-md bg-red-50 px-3 py-2 font-bold text-red-700">Delete</button></>} />;
}

function List({ title, items, render }) {
  return <div className="grid gap-3"><h2 className="text-2xl font-black text-brand-900">{title}</h2>{items.map((item) => <div key={item.id} className="rounded-md bg-white p-4 shadow-soft"><p className="font-black text-brand-900">{item.full_name || item.name || item.subject}</p><p className="mt-1 text-sm text-slate-650">{item.course || item.email} - {item.status}</p><p className="mt-2 text-sm text-slate-650">{item.message || item.success_story}</p><div className="mt-3 flex flex-wrap gap-2">{render(item)}</div></div>)}</div>;
}

function SettingsManager() {
  const fields = ["institute_name", "short_name", "tagline", "mission", "vision", "objectives", "principal_message", "phone", "email", "address", "facebook", "instagram", "youtube", "whatsapp"];
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => { fetch("/api/settings").then((r) => r.json()).then((d) => setForm(d.settings || {})); }, []);
  async function save(e) {
    e.preventDefault();
    setMessage("Saving...");
    const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    setMessage(res.ok ? "Settings updated." : (json.error || "Update failed."));
  }
  return <form onSubmit={save} className="rounded-md bg-white p-6 shadow-soft"><h2 className="text-2xl font-black text-brand-900">Site Settings</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{fields.map((name) => <textarea key={name} rows={["mission", "vision", "objectives", "principal_message"].includes(name) ? 4 : 1} value={form[name] || ""} onChange={(e) => setForm((old) => ({ ...old, [name]: e.target.value }))} placeholder={name.replaceAll("_", " ")} className="rounded-md border-slate-200 text-base" />)}</div><button className="mt-5 rounded-md bg-brand-700 px-5 py-3 font-bold text-white">Save Settings</button>{message && <span className="ml-4 text-sm font-semibold text-brand-700">{message}</span>}</form>;
}

function ProfileManager() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  async function save(e) {
    e.preventDefault();
    setMessage("Saving...");
    const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const json = await res.json();
    setMessage(res.ok ? "Profile updated." : (json.error || "Update failed."));
  }
  return <form onSubmit={save} className="grid gap-4 rounded-md bg-white p-6 shadow-soft"><h2 className="text-2xl font-black text-brand-900">Admin Profile</h2><input placeholder="Name" className="rounded-md border-slate-200 text-base" onChange={(e) => setForm({ ...form, name: e.target.value })} /><input placeholder="Email" type="email" className="rounded-md border-slate-200 text-base" onChange={(e) => setForm({ ...form, email: e.target.value })} /><input placeholder="New password" type="password" className="rounded-md border-slate-200 text-base" onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="rounded-md bg-brand-700 px-5 py-3 font-bold text-white">Update Profile</button>{message && <p className="text-sm font-semibold text-brand-700">{message}</p>}</form>;
}
