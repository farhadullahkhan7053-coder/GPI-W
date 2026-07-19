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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
    }, 1500);
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
            className="rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-all active:scale-95 border border-white/10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="bg-brand-50/50 px-6 py-3 border-b border-brand-100 flex items-center justify-between text-xs font-bold text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-brand-700 text-white" : "bg-slate-200 text-slate-500"}`}>1</span>
              <span className={step === 1 ? "text-brand-900 font-extrabold" : ""}>Personal Info</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200 flex-1 mx-2" />
            <div className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-brand-700 text-white" : "bg-slate-200 text-slate-500"}`}>2</span>
              <span className={step === 2 ? "text-brand-900 font-extrabold" : ""}>Select Course</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-200 flex-1 mx-2" />
            <div className="flex items-center gap-1.5">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? "bg-brand-700 text-white" : "bg-slate-200 text-slate-500"}`}>3</span>
              <span className={step === 3 ? "text-brand-900 font-extrabold" : ""}>Academics</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex gap-2 items-center mb-1 text-slate-800">
                <User size={18} className="text-brand-700" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-brand-900">Personal Details</h4>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Applicant full name"
                  className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.name ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                />
                {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Father's Name</label>
                <input 
                  type="text" 
                  name="fatherName" 
                  value={formData.fatherName} 
                  onChange={handleChange}
                  placeholder="Father's full name"
                  className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.fatherName ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                />
                {errors.fatherName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fatherName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">WhatsApp / Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="03001234567"
                    className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Domicile District</label>
                  <select 
                    name="domicile" 
                    value={formData.domicile} 
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all"
                  >
                    <option>Dera Ismail Khan</option>
                    <option>Tank</option>
                    <option>Lakki Marwat</option>
                    <option>Bannu</option>
                    <option>Bhakar</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Email Address (Optional)</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Course Selection */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex gap-2 items-center mb-1 text-slate-800">
                <BookOpen size={18} className="text-brand-700" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-brand-900">Choose Program/Trade</h4>
              </div>
              <p className="text-slate-500 text-xs font-medium">Select one technical or vocational program to apply for:</p>
              
              <div className="grid gap-2.5 max-h-[280px] overflow-y-auto pr-1">
                {courses.map((c) => {
                  const isSelected = formData.course === c.name;
                  return (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => setFormData({ ...formData, course: c.name })}
                      className={`w-full text-left rounded-xl p-3.5 border transition-all flex items-center justify-between group ${isSelected ? "border-brand-700 bg-brand-50/50 shadow-sm" : "border-slate-200 hover:bg-slate-50"}`}
                    >
                      <div>
                        <p className={`text-sm font-extrabold ${isSelected ? "text-brand-900" : "text-slate-700"}`}>{c.name}</p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{c.type}</p>
                      </div>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-brand-700 bg-brand-700" : "border-slate-300"}`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Academic History */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex gap-2 items-center mb-1 text-slate-800">
                <GraduationCap size={18} className="text-brand-700" />
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-brand-900">Academic Background</h4>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Matriculation Board / School</label>
                <input 
                  type="text" 
                  name="matricBoard" 
                  value={formData.matricBoard} 
                  onChange={handleChange}
                  placeholder="e.g. BISE Bannu, BISE Peshawar"
                  className={`w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-brand-100 focus:border-brand-700 outline-none transition-all ${errors.matricBoard ? "border-red-500 bg-red-50/20" : "border-slate-200"}`}
                />
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
