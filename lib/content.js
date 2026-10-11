import { one, query, getPool, isDbAvailable } from "./db.js";
import fs from "fs";
import path from "path";

const MOCK_DB_PATH = path.join(process.cwd(), "database", "mock_db.json");

export function getMockDB() {
  if (fs.existsSync(MOCK_DB_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MOCK_DB_PATH, "utf8"));
    } catch {
      // ignore
    }
  }
  const initial = {
    settings: defaultSettings,
    courses: fallbackCourses,
    announcements: fallbackAnnouncements,
    gallery: fallbackGallery,
    alumni: [
      {
        id: 1,
        full_name: "Ayesha Bibi",
        father_name: "Muhammad Ali",
        course: "Fashion Designing (Level-2)",
        passing_year: 2024,
        phone: "0300-1234567",
        email: "ayesha@example.com",
        current_status: "Boutique Owner",
        organization: "Style Studio D.I. Khan",
        city: "Dera Ismail Khan",
        success_story: "After completing my DAE Dress Designing and Level-2 courses, I started my own boutique at home. Now I employ two other girls and generate a steady income.",
        status: "approved"
      }
    ],
    contact_messages: [
      {
        id: 1,
        name: "Sajid Khan",
        email: "sajid@example.com",
        phone: "0312-3456789",
        subject: "Admission Inquiry DIT",
        message: "When will DIT classes start, and is hostel facility currently available?",
        status: "unread",
        created_at: new Date().toISOString()
      }
    ]
  };
  try {
    fs.mkdirSync(path.dirname(MOCK_DB_PATH), { recursive: true });
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(initial, null, 2), "utf8");
  } catch (e) {
    // ignore directory/write errors in read-only environment
  }
  return initial;
}

export function saveMockDB(db) {
  try {
    fs.mkdirSync(path.dirname(MOCK_DB_PATH), { recursive: true });
    fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch (e) {
    // ignore
  }
}

function hasDatabaseConfig() {
  return Boolean(process.env.DB_NAME && process.env.DB_HOST);
}

export function isDatabaseConfigured() {
  if (!hasDatabaseConfig()) return false;
  try {
    getPool();
  } catch (e) {
    return false;
  }
  return isDbAvailable();
}

export const defaultSettings = {
  institute_name: "Government Technical And Vocational College",
  short_name: "GTVC Parova",
  tagline: "Empowering Women Through Technical & Vocational Excellence",
  mission: "To provide quality technical and vocational education that prepares women with practical skills, confidence, and professional discipline.",
  vision: "To become a leading women-focused technical institute recognized for skill excellence, innovation, and employability.",
  objectives: "Deliver practical training, strengthen industry-relevant skills, encourage entrepreneurship, and create a safe, supportive learning environment.",
  principal_message: "Our institute is committed to opening professional pathways for women through hands-on technical education, discipline, and modern learning practices.",
  phone: "+92 966 000000",
  email: "info@gpiwdikhan.edu.pk",
  address: "Dera Ismail Khan, Khyber Pakhtunkhwa, Pakistan",
  facebook: "https://m.facebook.com/gpiwdikhan",
  instagram: "",
  youtube: "",
  whatsapp: "https://wa.me/message/7PDY6L52IVPPP1"
};

export const fallbackCourses = [
  {
    id: 1,
    title: "DAE Computer Hardware Technology",
    slug: "dae-computer-hardware",
    duration: "3 Years (6 Semesters)",
    eligibility: "Matric (Science) or equivalent",
    short_description: "3-year Diploma of Associate Engineer (DAE) in Computer Hardware Technology — specializing in system architecture, repair, electronics, and networking.",
    full_description: "The DAE in Computer Hardware Technology is a comprehensive three-year diploma program that equips students with hardware-level engineering competencies. The program covers computer architecture, digital electronics, microprocessor systems, peripheral device interfacing, operating systems, local area network administration, and system troubleshooting. Aligned with national technical education board standards, it provides a solid foundation for careers in IT infrastructure and hardware manufacturing.",
    skills: "Computer troubleshooting, motherboard diagnostics, operating systems installation, network administration, hardware assembly, server maintenance, microcontrollers, digital electronics",
    career_opportunities: "Hardware technician, network support specialist, system administrator, network engineer, hardware consultant, IT repair entrepreneur",
    image: "/uploads/computer_lab.jpg",
    status: "published"
  },
  {
    id: 2,
    title: "DAE Dress Designing & Making (Level 5)",
    slug: "dae-dress-designing-making-level-5",
    duration: "3 Years (6 Semesters)",
    eligibility: "Matric (Science / Arts) or equivalent",
    short_description: "3-year Diploma of Associate Engineer (DAE) in Dress Designing & Making (Level 5) — specializing in garment designing, fashion illustration, pattern drafting, and production.",
    full_description: "The DAE Dress Designing & Making (Level 5) is a three-year diploma program offering advanced technical and creative training in fashion illustration, pattern drafting, garment construction, fabric science, textile embellishment, draping, and boutique management. This program is aligned with NAVTTC and KPBTE national qualification standards (Level 5), preparing graduates for industrial fashion roles, apparel production management, or self-employment.",
    skills: "Fashion illustration, pattern drafting, draping, fabric selection, garment construction, machine sewing, embroidery, quality control, boutique management",
    career_opportunities: "Fashion designer, apparel supervisor, pattern master, boutique owner, costume designer, industrial apparel inspector, self-employed fashion designer",
    image: "/uploads/dress_design_class2.jpg",
    status: "published"
  },
  {
    id: 3,
    title: "Diploma in Information Technology (DIT)",
    slug: "diploma-information-technology-dit",
    duration: "1 Year (2 Semesters)",
    eligibility: "Matric or equivalent",
    short_description: "1-year comprehensive diploma program covering database systems, web development, office tools, and networking foundations.",
    full_description: "The Diploma in Information Technology (DIT) is a highly practical one-year program designed to equip students with core IT skills. The program covers computer applications, database management systems, web design and development (HTML, CSS, JavaScript), programming concepts, graphic design basics, and IT support. Aligned with KPBTE standards, it is a key credential for entering the modern IT workforce.",
    skills: "Database administration, web design, office automation, computer networking, programming basics, graphic design, operating systems",
    career_opportunities: "IT assistant, database operator, junior web developer, office coordinator, technical support representative",
    image: "/uploads/typing.jpg",
    status: "published"
  },
  {
    id: 4,
    title: "Beauty & Hair Therapy (Level-2)",
    slug: "beauty-hair-therapy-level-2",
    duration: "6 Months",
    eligibility: "Middle or Matric",
    short_description: "6-month CBT (RPL) program focusing on professional skincare, hair styling, bridal makeup, salon management, and client hygiene.",
    full_description: "The Beauty & Hair Therapy (Level-2) is a Competency-Based Training (CBT) program, also available via Recognition of Prior Learning (RPL). It covers modern skin treatments, hair styling, coloring techniques, professional makeup, manicure, pedicure, and salon ethics. It aims to turn passion into professional salon-grade expertise with international compliance standards.",
    skills: "Facial treatments, bridal makeup, hair styling, hair coloring, manicures, salon hygiene, client consulting",
    career_opportunities: "Beautician, hair stylist, makeup artist, salon assistant, bridal makeup expert, self-employed salon owner",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
    status: "published"
  },
  {
    id: 5,
    title: "Fashion Designing (Level-2)",
    slug: "fashion-designing-level-2",
    duration: "6 Months",
    eligibility: "Middle or Matric",
    short_description: "6-month CBT (RPL) program covering introductory design principles, basic sketching, pattern making, and garment tailoring.",
    full_description: "The Fashion Designing (Level-2) Competency-Based Training program provides core competencies in fashion design. Students learn basic fashion sketching, fabric identification, standard pattern creation, industrial machine operation, and stitching techniques. This course offers an entry-level pathway to apparel careers or home-based fashion boutique startup.",
    skills: "Basic fashion sketching, pattern cutting, machine stitching, fabric styling, garment assembly, design concepts",
    career_opportunities: "Tailoring specialist, design assistant, pattern maker assistant, boutique partner, home-based stylist",
    image: "/uploads/bedsheet_cushion_curtains.jpg",
    status: "published"
  },
  {
    id: 6,
    title: "Computer Operator (Level-2)",
    slug: "computer-operator-level-2",
    duration: "6 Months",
    eligibility: "Matric or Middle",
    short_description: "6-month CBT (RPL) course for office productivity, professional typing, data management, and computer operations.",
    full_description: "The Computer Operator (Level-2) program trains students in office productivity suites, data entry operations, internet communication, and basic hardware handling. Graduates are proficient in word processing, spreadsheets, presentations, and electronic record keeping according to standard administrative practices.",
    skills: "Word processing, spreadsheet calculations, data entry, professional typing, internet communication, system operations",
    career_opportunities: "Data entry operator, computer operator, front desk coordinator, office clerk, administrative assistant",
    image: "/uploads/computer_lab.jpg",
    status: "published"
  },
  {
    id: 7,
    title: "AutoCAD (Computer-Aided Design)",
    slug: "autocad-computer-aided-design",
    duration: "6 Months",
    eligibility: "Matric or equivalent",
    short_description: "6-month practical CAD course focusing on 2D drafting, 3D modeling, blueprints, and architectural layouts.",
    full_description: "Our AutoCAD course teaches professional Computer-Aided Design (CAD) workflows. Students master 2D drafting, drawing scaling, projection, architectural layouts, engineering drawings, and basic 3D rendering. It is designed for students seeking careers in civil design, architecture, interior decoration, and construction drafting.",
    skills: "2D drafting, 3D modeling, blueprint reading, structural layout, design annotation, CAD scaling, rendering",
    career_opportunities: "CAD draftsman, design assistant, drafting technician, architectural renderer, planning assistant",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop",
    status: "published"
  },
  {
    id: 8,
    title: "Architecture Assistantship",
    slug: "architecture-assistantship",
    duration: "6 Months",
    eligibility: "Matric or equivalent",
    short_description: "6-month vocational course in architectural drafting, building materials, layout planning, and interior design basics.",
    full_description: "The Architecture course provides fundamental training in architectural drafting, scale drawings, structural planning, building construction materials, and interior layouts. Aligned with modern drafting requirements, students gain the competency to assist senior architects, designers, and site managers.",
    skills: "Architectural drafting, layout planning, material selection, interior layout design, scale calculation, drawing interpretation",
    career_opportunities: "Architect assistant, interior design trainee, building layout planner, architectural model builder",
    image: "https://images.unsplash.com/photo-1503387762-592dedb8c310?q=80&w=900&auto=format&fit=crop",
    status: "published"
  },
  {
    id: 9,
    title: "Graphics Designing (Level 3)",
    slug: "graphics-designing-level-3",
    duration: "6 Months",
    eligibility: "Matric or equivalent",
    short_description: "6-month CBT (RPL) Level 3 course in digital media, branding, vector design, and photo manipulation.",
    full_description: "The Graphics Designing (Level 3) course is an advanced competency-based program. Students learn vector drawing (Adobe Illustrator), image editing and manipulation (Adobe Photoshop), desktop publishing (InDesign), brand styling, typography, and advertising layouts. It is geared towards creating professional freelance graphic designers and agency ready experts.",
    skills: "Vector design, branding, photo manipulation, layout design, typography, color theory, portfolio design",
    career_opportunities: "Freelance graphic designer, UI assistant, brand visualizer, desktop publisher, creative designer",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop",
    status: "published"
  },
  {
    id: 10,
    title: "Web Development (Level 3)",
    slug: "web-development-level-3",
    duration: "6 Months",
    eligibility: "Matric or equivalent",
    short_description: "6-month CBT (RPL) Level 3 course in modern frontend development, HTML5, CSS3, JavaScript, and responsive design.",
    full_description: "The Web Development (Level 3) course covers modern frontend web technologies. Students build responsive websites using semantic HTML5, CSS3 styling with flexbox/grid layout, interactive Javascript, and source control using Git. It provides a solid foundation for aspiring frontend developers and freelance web builders.",
    skills: "HTML5, CSS3, JavaScript, responsive design, Git, CSS frameworks, hosting, DOM manipulation",
    career_opportunities: "Frontend developer, web designer, freelance web developer, site maintainer, web content coordinator",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=900&auto=format&fit=crop",
    status: "published"
  }
];

export const fallbackAnnouncements = [
  {
    id: 11,
    title: "Annual Student Exhibition Held at GPI(W) D.I. Khan",
    description: "GPI(W) Dera Ismail Khan organized its Annual Student Exhibition on campus. Students from various departments displayed their creative talent and business skills, showcasing food stalls, handmade accessories, customized jewelry, calligraphies and paintings, and elegant dress designs. The exhibition highlighted the practical and entrepreneurial skills fostered by the institute.",
    category: "Exhibition",
    date: "2026-06-21",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 10,
    title: "Green Campus Plantation Drive Conducted at GPI(W)",
    description: "In an effort to promote environmental sustainability, Government Polytechnic Institute (Women) Dera Ismail Khan organized a tree plantation drive on campus. Faculty members and students actively participated in planting saplings and raising awareness about environmental conservation and green initiatives.",
    category: "Campaign",
    date: "2026-06-21",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 9,
    title: "Independence Day Celebrated with Zeal at GPI(W)",
    description: "Government Polytechnic Institute (Women) Dera Ismail Khan celebrated Pakistan's Independence Day on August 14. Faculty and students gathered to celebrate the day with patriotic fervor, featuring a flag hoisting ceremony, national songs, speech competitions, and presentations focusing on women's contribution to the development of the nation.",
    category: "Celebration",
    date: "2025-08-14",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 8,
    title: "State Bank of Pakistan Conducts Awareness Session at GPI(W)",
    description: "The State Bank of Pakistan (SBP) conducted an informative financial awareness session for female entrepreneurs and vocational students at Government Polytechnic Institute (Women) Dera Ismail Khan, focusing on banking services, digital financing, and entrepreneurial micro-loans.",
    category: "Seminar",
    date: "2026-06-20",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 7,
    title: "International Women's Day 2026 Celebrated at GPI(W)",
    description: "In collaboration with SRSP and KfW, Government Polytechnic Institute (Women) Dera Ismail Khan celebrated International Women's Day 2026. The event, themed 'Honouring The Contributions of Women in Building Strong Communities', featured an interactive seminar highlighting women's empowerment through technical skills and vocational training.",
    category: "Event",
    date: "2026-03-08",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 6,
    title: "Monitoring Visit Held on Cluster-Based Training",
    description: "An official monitoring visit was conducted at Government Polytechnic Institute (Women) Dera Ismail Khan to evaluate the progress and quality of the ongoing Cluster-Based Training programs, confirming compliance with technical vocational standards.",
    category: "Monitoring",
    date: "2026-06-20",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 5,
    title: "Parent-Teacher Meeting Held at GPI(W)",
    description: "A successful Parent-Teacher Meeting was conducted at Government Polytechnic Institute (Women) Dera Ismail Khan, facilitating discussions between parents and faculty regarding academic performance, attendance, and career prospects.",
    category: "Meeting",
    date: "2026-06-20",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 4,
    title: "NAVTTC Head Office Team Conducts Accreditation Audit",
    description: "The Internal Accreditation Team from the NAVTTC Head Office visited Government Polytechnic Institute (Women) Dera Ismail Khan to conduct a detailed quality audit, ensuring compliance with national technical education standards and accreditation of programs.",
    category: "Accreditation",
    date: "2026-06-20",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 3,
    title: "Urdu AI Workshop Conducted at GPI(W)",
    description: "An interactive workshop on Urdu AI was successfully conducted at Government Polytechnic Institute (Women) Dera Ismail Khan, introducing students to modern artificial intelligence tools and digital literacy in Urdu.",
    category: "Workshop",
    date: "2026-06-19",
    is_important: true,
    status: "published",
    attachment: ""
  },
  {
    id: 1,
    title: "Admissions Open for Technical and Vocational Courses",
    description: "Applications are invited for current session courses. Interested students should visit the admission office with required documents.",
    category: "Admission",
    date: "2026-05-08",
    is_important: true,
    status: "published",
    attachment: "/uploads/admission_advertisement.jpg"
  },
  {
    id: 2,
    title: "Skill Development Workshop Schedule",
    description: "Workshop dates for practical training sessions will be shared with enrolled students by the training office.",
    category: "Academics",
    date: "2026-05-08",
    is_important: false,
    status: "published",
    attachment: ""
  }
];

export const fallbackGallery = [
  { id: 1, title: "Computer Lab Setup", category: "Labs", image: "/uploads/computer_lab.jpg" },
  { id: 2, title: "Classroom Session", category: "Classrooms", image: "/uploads/classroom.jpg" },
  { id: 3, title: "Practical Keyboard Typing", category: "Workshops", image: "/uploads/typing.jpg" },
  { id: 4, title: "Student Guidance & Counseling", category: "Administration", image: "/uploads/staff_meeting.jpg" },
  { id: 5, title: "Main Campus Entrance", category: "Administration", image: "/uploads/entrance.jpg" },
  { id: 6, title: "DAE Dress Designing & Making Class", category: "Workshops", image: "/uploads/dress_design_class2.jpg" },
  { id: 7, title: "Urdu AI Workshop Session", category: "Workshops", image: "/uploads/urduai_workshop.jpg" },
  { id: 8, title: "NAVTTC Internal Accreditation Audit Meeting", category: "Administration", image: "/uploads/navttc_accreditation.jpg" },
  { id: 9, title: "Urdu AI Workshop Group Photo", category: "Workshops", image: "/uploads/urduai_group.jpg" },
  { id: 10, title: "Examination Hall", category: "Classrooms", image: "/uploads/examination_hall.png" },
  { id: 11, title: "Bedsheet, Cushion & Curtains Making Class", category: "Workshops", image: "/uploads/bedsheet_cushion_curtains.jpg" },
  { id: 12, title: "Parent-Teacher Meeting Session", category: "Administration", image: "/uploads/parents_teacher_meeting.jpg" },
  { id: 13, title: "Cluster-Based Training Monitoring Session", category: "Administration", image: "/uploads/monitoring_visit_cluster.png" },
  { id: 14, title: "International Women's Day 2026 Seminar", category: "Events", image: "/uploads/womens_day_classroom.jpg" },
  { id: 15, title: "International Women's Day 2026 Banner", category: "Events", image: "/uploads/womens_day_banner.png" },
  { id: 16, title: "State Bank of Pakistan (SBP) Entrepreneurship Seminar", category: "Events", image: "/uploads/sbp_bank_session.png" },
  { id: 17, title: "Students Practicing on Sewing Machines", category: "Workshops", image: "/uploads/practical_work_sewing1.png" },
  { id: 18, title: "Dress Designing Practical Sewing Class", category: "Workshops", image: "/uploads/practical_work_sewing2.jpg" },
  { id: 19, title: "Student Hand Embroidery Flower Pattern", category: "Workshops", image: "/uploads/embroidery_work1.jpg" },
  { id: 20, title: "Ribbon Rose Embroidery Sample Work", category: "Workshops", image: "/uploads/embroidery_work2.jpg" },
  { id: 21, title: "Independence Day Celebration Ceremony", category: "Events", image: "/uploads/independence_day_14august.jpg" },
  { id: 22, title: "Students Planting Saplings on Campus", category: "Events", image: "/uploads/plantation_activity1.jpg" },
  { id: 23, title: "Tree Plantation Drive Close-up", category: "Events", image: "/uploads/plantation_activity2.jpg" },
  { id: 24, title: "Student Food Stall at Annual Exhibition", category: "Events", image: "/uploads/exhibition_food.jpg" },
  { id: 25, title: "Handmade Hair Accessories Stall", category: "Events", image: "/uploads/exhibition_accessories.jpg" },
  { id: 26, title: "Customized Name Bracelets & Jewelry Stall", category: "Events", image: "/uploads/exhibition_jewelry.jpg" },
  { id: 27, title: "Paintings and Calligraphy Art Display", category: "Events", image: "/uploads/exhibition_art.jpg" },
  { id: 28, title: "Dress Designing and Apparel Display Stall", category: "Events", image: "/uploads/exhibition_clothing.jpg" },
  { id: 29, title: "Paintings & Calligraphy Art Exhibition", category: "Events", image: "/uploads/art_exhibition_blurred.jpg" },
  { id: 30, title: "Students Checking Results on Exam Notice Board", category: "Administration", image: "/uploads/internal_exam_controller.jpg" },
  { id: 31, title: "Student Still Life Flower Painting", category: "Workshops", image: "/uploads/student_art_flower.png" },
  { id: 32, title: "Student Bald Eagle Portrait Painting", category: "Workshops", image: "/uploads/student_art_eagle.png" },
  { id: 33, title: "Student Drapery Study Painting", category: "Workshops", image: "/uploads/student_art_drapery.png" },
  { id: 34, title: "Student Bookshelf and Books Painting", category: "Workshops", image: "/uploads/student_art_bookshelf.jpg" },
  { id: 35, title: "Official Admission Open Advertisement Flyer", category: "Advertisement", image: "/uploads/admission_advertisement.jpg" }
];

export async function getSettings() {
  if (!hasDatabaseConfig()) {
    const db = getMockDB();
    return db.settings || defaultSettings;
  }
  try {
    const row = await one("SELECT * FROM site_settings WHERE id = 1");
    return row || defaultSettings;
  } catch {
    const db = getMockDB();
    return db.settings || defaultSettings;
  }
}

export async function getPublicCourses(limit = 20) {
  if (!hasDatabaseConfig()) {
    const db = getMockDB();
    return (db.courses || fallbackCourses).slice(0, limit);
  }
  try {
    const rows = await query("SELECT * FROM courses WHERE status = 'published' ORDER BY created_at DESC LIMIT :limit", { limit });
    return rows.length ? rows : (getMockDB().courses || fallbackCourses).slice(0, limit);
  } catch {
    const db = getMockDB();
    return (db.courses || fallbackCourses).slice(0, limit);
  }
}

export async function getCourseBySlug(slug) {
  const getFallback = () => {
    const db = getMockDB();
    return (db.courses || fallbackCourses).find((course) => course.slug === slug) || null;
  };
  if (!hasDatabaseConfig()) return getFallback();
  try {
    return (await one("SELECT * FROM courses WHERE slug = :slug AND status = 'published' LIMIT 1", { slug })) || getFallback();
  } catch {
    return getFallback();
  }
}

export async function getPublicAnnouncements(limit = 20) {
  const getFallback = () => {
    const db = getMockDB();
    const list = db.announcements || fallbackAnnouncements;
    return [...list]
      .sort((a, b) => {
        if (a.is_important && !b.is_important) return -1;
        if (!a.is_important && b.is_important) return 1;
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, limit);
  };
  if (!hasDatabaseConfig()) return getFallback();
  try {
    const rows = await query("SELECT * FROM announcements WHERE status = 'published' ORDER BY is_important DESC, date DESC LIMIT :limit", { limit });
    return rows.length ? rows : getFallback();
  } catch {
    return getFallback();
  }
}

export async function getPublicGallery(limit = 12) {
  const getFallback = () => {
    const db = getMockDB();
    return (db.gallery || fallbackGallery).slice(0, limit);
  };
  if (!hasDatabaseConfig()) return getFallback();
  try {
    const rows = await query("SELECT * FROM gallery ORDER BY created_at DESC LIMIT :limit", { limit });
    return rows.length ? rows : getFallback();
  } catch {
    return getFallback();
  }
}

export async function getStats() {
  const getFallback = () => {
    const db = getMockDB();
    const coursesCount = (db.courses || fallbackCourses).filter(c => c.status === "published").length;
    const alumniCount = (db.alumni || []).filter(a => a.status === "approved").length;
    const galleryCount = (db.gallery || fallbackGallery).length;
    return { 
      students: "500+", 
      staff: "35+", 
      courses: `${coursesCount}+`, 
      alumni: `${alumniCount || 250}+`, 
      gallery: galleryCount 
    };
  };
  if (!hasDatabaseConfig()) return getFallback();
  try {
    const courses = await one("SELECT COUNT(*) total FROM courses WHERE status = 'published'");
    const alumni = await one("SELECT COUNT(*) total FROM alumni WHERE status = 'approved'");
    const gallery = await one("SELECT COUNT(*) total FROM gallery");
    return { students: "500+", staff: "35+", courses: courses?.total || 0, alumni: alumni?.total || "250+", gallery: gallery?.total || 0 };
  } catch {
    return getFallback();
  }
}
