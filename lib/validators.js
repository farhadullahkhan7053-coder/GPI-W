import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const courseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  duration: z.string().min(2),
  eligibility: z.string().min(2),
  short_description: z.string().min(10),
  full_description: z.string().min(10),
  skills: z.string().optional().default(""),
  career_opportunities: z.string().optional().default(""),
  image: z.string().optional().default(""),
  status: z.enum(["published", "draft"]).default("published")
});

export const announcementSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  category: z.string().min(2),
  date: z.string().min(8),
  is_important: z.coerce.boolean().default(false),
  status: z.enum(["published", "draft"]).default("published"),
  attachment: z.string().optional().default("")
});

export const gallerySchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  image: z.string().min(2)
});

export const alumniSchema = z.object({
  full_name: z.string().min(3),
  father_name: z.string().min(3),
  course: z.string().min(2),
  passing_year: z.coerce.number().min(1970).max(2100),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  current_status: z.string().optional().default(""),
  organization: z.string().optional().default(""),
  city: z.string().optional().default(""),
  success_story: z.string().optional().default(""),
  status: z.enum(["pending", "approved", "rejected"]).default("pending")
});

export const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export const settingsSchema = z.object({
  institute_name: z.string().min(5),
  short_name: z.string().min(2),
  tagline: z.string().min(5),
  mission: z.string().min(10),
  vision: z.string().min(10),
  objectives: z.string().min(10),
  principal_message: z.string().min(10),
  phone: z.string().optional().default(""),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  youtube: z.string().optional().default("")
});
