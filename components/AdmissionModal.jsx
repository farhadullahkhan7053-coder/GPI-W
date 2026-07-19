"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, User, BookOpen, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";

export default function AdmissionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    domicile: "Dera Ismail Khan",
    course: "DAE Computer Hardware Technology",
    matricBoard: "",
    matricMarks: "",
    matricTotal: "1100",
    passingYear: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setErrors({});
    };
    window.addEventListener("open-admission-modal", handleOpen);
    return () => window.removeEventListener("open-admission-modal", handleOpen);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10,12}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
        newErrors.phone = "Provide a valid phone number";
      }
    } else if (step === 3) {
      if (!formData.matricBoard.trim()) newErrors.matricBoard = "Board/School name is required";
      if (!formData.matricMarks.trim()) newErrors.matricMarks = "Marks are required";
      if (!formData.passingYear.trim()) newErrors.passingYear = "Passing year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, "")}@example.com`,
        phone: formData.phone,
        subject: `Online Admission Request: ${formData.course}`,
        message: `Applicant Details:\n` +
                 `- Father's Name: ${formData.fatherName}\n` +
                 `- Domicile: ${formData.domicile}\n` +
                 `- Applied Program: ${formData.course}\n` +
                 `- Matric Board/School: ${formData.matricBoard}\n` +
                 `- Obtained Marks: ${formData.matricMarks} / ${formData.matricTotal}\n` +
                 `- Passing Year: ${formData.passingYear}`
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStep(4);
      } else {
        const json = await res.json();
        setErrors({ submit: json.error || "Submission failed. Please verify fields and try again." });
      }
    } catch {
      setErrors({ submit: "A network error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const courses = [
    { name: "DAE Computer Hardware Technology", type: "3-Year DAE" },
    { name: "DAE Dress Designing & Making (Level 5)", type: "3-Year DAE" },
    { name: "Diploma in Information Technology (DIT)", type: "1-Year DIT" },
    { name: "Beauty & Hair Therapy (Level-2)", type: "6-Month Short Course" },
    { name: "Fashion Designing (Level-2)", type: "6-Month Short Course" },
    { name: "Graphics Designing (Level 3)", type: "6-Month Short Course" },
    { name: "Web Development (Level 3)", type: "6-Month Short Course" }
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
        onClick={(e) => e.stopPropagation()}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Header decoration */}
        <div className="bg-brand-900 px-6 py-5 text-white flex justify-between items-center relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/15 rounded-full blur-xl pointer-events-none" />
          <div>
            <span className="text-gold font-extrabold uppercase tracking-widest text-[10px]">Online Funnel</span>
            <h3 className="text-xl font-black tracking-tight mt-0.5">Admission Application</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-all border border-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          
          {/* Step Indicators */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 text-xs font-bold text-slate-400">
              <span className={`flex items-center gap-1.5 ${step === 1 ? "text-brand-900 font-extrabold" : ""}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 1 ? "bg-brand-900 border-brand-900 text-white" : "border-slate-200"}`}>1</span>
                Personal
              </span>
              <span className="w-10 h-px bg-slate-200" />
              <span className={`flex items-center gap-1.5 ${step === 2 ? "text-brand-900 font-extrabold" : ""}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 2 ? "bg-brand-900 border-brand-900 text-white" : "border-slate-200"}`}>2</span>
                Program
              </span>
              <span className="w-10 h-px bg-slate-200" />
              <span className={`flex items-center gap-1.5 ${step === 3 ? "text-brand-900 font-extrabold" : ""}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 3 ? "bg-brand-900 border-brand-900 text-white" : "border-slate-200"}`}>3</span>
                Academic
              </span>
            </div>
          )}

          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Name *</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400"><User size={18} /></span>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-xl border pl-11 pr-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Father's Name *</label>
                <input 
                  type="text" 
                  name="fatherName" 
                  value={formData.fatherName} 
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.fatherName ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                />
                {errors.fatherName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fatherName}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="e.g. 03361936986"
                    className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="e.g. name@domain.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Domicile District</label>
                <select 
                  name="domicile"
                  value={formData.domicile}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all"
                >
                  <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                  <option value="Tank">Tank</option>
                  <option value="Lakki Marwat">Lakki Marwat</option>
                  <option value="Bannu">Bannu</option>
                  <option value="South Waziristan">South Waziristan</option>
                  <option value="Other">Other District</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Course Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in max-h-[350px] overflow-y-auto pr-1">
              <label className="block text-xs font-bold text-slate-500 mb-2">Select Your Program / Trade *</label>
              <div className="space-y-2">
                {courses.map((course) => (
                  <label 
                    key={course.name}
                    className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
                      formData.course === course.name 
                        ? "border-brand-700 bg-brand-50/40 ring-1 ring-brand-700" 
                        : "border-slate-150 hover:bg-slate-50"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="course" 
                      value={course.name} 
                      checked={formData.course === course.name}
                      onChange={handleChange}
                      className="mt-1 text-brand-700 focus:ring-brand-700"
                    />
                    <div>
                      <p className="font-extrabold text-brand-900 text-sm leading-snug">{course.name}</p>
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mt-1">{course.type}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Academic Qualifications */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-150 rounded-xl text-red-700 text-xs font-bold">
                  {errors.submit}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Matriculation Board / School *</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-400"><GraduationCap size={18} /></span>
                  <input 
                    type="text" 
                    name="matricBoard" 
                    value={formData.matricBoard} 
                    onChange={handleChange}
                    placeholder="e.g. BISE D.I. Khan"
                    className={`w-full rounded-xl border pl-11 pr-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.matricBoard ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                  />
                </div>
                {errors.matricBoard && <p className="text-red-500 text-xs font-bold mt-1">{errors.matricBoard}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Obtained Marks</label>
                  <input 
                    type="number" 
                    name="matricMarks" 
                    value={formData.matricMarks} 
                    onChange={handleChange}
                    placeholder="e.g. 850"
                    className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.matricMarks ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                  />
                  {errors.matricMarks && <p className="text-red-500 text-xs font-bold mt-1">{errors.matricMarks}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Total Marks</label>
                  <input 
                    type="number" 
                    name="matricTotal" 
                    value={formData.matricTotal} 
                    onChange={handleChange}
                    placeholder="1100"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Passing Year</label>
                <input 
                  type="number" 
                  name="passingYear" 
                  value={formData.passingYear} 
                  onChange={handleChange}
                  placeholder="e.g. 2024"
                  className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.passingYear ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                />
                {errors.passingYear && <p className="text-red-500 text-xs font-bold mt-1">{errors.passingYear}</p>}
              </div>
            </div>
          )}

          {/* STEP 4: Success confirmation */}
          {step === 4 && (
            <div className="text-center py-8 px-4 animate-fade-in flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5 animate-bounce">
                <CheckCircle2 size={44} className="stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-black text-brand-900 tracking-tight">Application Submitted!</h4>
              <p className="mt-3 text-slate-600 font-medium text-sm leading-relaxed max-w-sm">
                Thank you, <strong className="text-brand-900">{formData.name}</strong>. Your online application for <strong>{formData.course}</strong> has been logged successfully.
              </p>
              <p className="mt-4 text-xs font-bold text-slate-500 bg-brand-50 border border-brand-100 rounded-full px-4 py-1.5 inline-block">
                Our admission officer will contact you shortly at {formData.phone}
              </p>
              
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-8 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-extrabold px-8 py-3.5 shadow-md shadow-brand-900/10 transition-all hover:scale-105 active:scale-95"
              >
                Close Portal
              </button>
            </div>
          )}

          {/* Footer Controls */}
          {step < 4 && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white px-6 py-3.5 text-sm font-extrabold shadow-md shadow-brand-900/10 transition-all hover:scale-105 active:scale-95"
                >
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gold hover:bg-yellow-500 text-brand-950 px-6 py-3.5 text-sm font-black shadow-md shadow-gold/15 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"} <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
