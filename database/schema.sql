CREATE DATABASE IF NOT EXISTS gpiw_di_khan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gpiw_di_khan;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  duration VARCHAR(80) NOT NULL,
  eligibility VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  full_description LONGTEXT NOT NULL,
  skills LONGTEXT,
  career_opportunities LONGTEXT,
  image VARCHAR(255),
  status ENUM('published','draft') NOT NULL DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  description LONGTEXT NOT NULL,
  category VARCHAR(80) NOT NULL,
  date DATE NOT NULL,
  is_important BOOLEAN NOT NULL DEFAULT FALSE,
  status ENUM('published','draft') NOT NULL DEFAULT 'published',
  attachment VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alumni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(140) NOT NULL,
  father_name VARCHAR(140) NOT NULL,
  course VARCHAR(140) NOT NULL,
  passing_year YEAR NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160),
  current_status VARCHAR(160),
  organization VARCHAR(180),
  city VARCHAR(100),
  success_story LONGTEXT,
  status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40),
  subject VARCHAR(180) NOT NULL,
  message LONGTEXT NOT NULL,
  status ENUM('unread','read') NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  institute_name VARCHAR(220) NOT NULL,
  short_name VARCHAR(80) NOT NULL,
  tagline VARCHAR(220) NOT NULL,
  mission LONGTEXT NOT NULL,
  vision LONGTEXT NOT NULL,
  objectives LONGTEXT NOT NULL,
  principal_message LONGTEXT NOT NULL,
  phone VARCHAR(80),
  email VARCHAR(160),
  address VARCHAR(255),
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  youtube VARCHAR(255),
  whatsapp VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO site_settings (id, institute_name, short_name, tagline, mission, vision, objectives, principal_message, phone, email, address, facebook, instagram, youtube, whatsapp)
VALUES (
  1,
  'Government Technical And Vocational College',
  'GTVC Parova',
  'Empowering Women Through Technical & Vocational Excellence',
  'To provide quality technical and vocational education that prepares women with practical skills, confidence, and professional discipline.',
  'To become a leading women-focused technical institute recognized for skill excellence, innovation, and employability.',
  'Deliver practical training, strengthen industry-relevant skills, encourage entrepreneurship, and create a safe, supportive learning environment.',
  'Our institute is committed to opening professional pathways for women through hands-on technical education, discipline, and modern learning practices.',
  '+92 966 000000',
  'info@gpiwdikhan.edu.pk',
  'Dera Ismail Khan, Khyber Pakhtunkhwa, Pakistan',
  'https://m.facebook.com/gpiwdikhan',
  '',
  '',
  'https://wa.me/message/7PDY6L52IVPPP1'
) ON DUPLICATE KEY UPDATE id = id;

TRUNCATE TABLE courses;
INSERT INTO courses (title, slug, duration, eligibility, short_description, full_description, skills, career_opportunities, image, status)
VALUES
('DAE Computer Hardware Technology', 'dae-computer-hardware', '3 Years (6 Semesters)', 'Matric (Science) or equivalent', '3-year Diploma of Associate Engineer (DAE) in Computer Hardware Technology — specializing in system architecture, repair, electronics, and networking.', 'The DAE in Computer Hardware Technology is a comprehensive three-year diploma program that equips students with hardware-level engineering competencies. The program covers computer architecture, digital electronics, microprocessor systems, peripheral device interfacing, operating systems, local area network administration, and system troubleshooting. Aligned with national technical education board standards, it provides a solid foundation for careers in IT infrastructure and hardware manufacturing.', 'Computer troubleshooting, motherboard diagnostics, operating systems installation, network administration, hardware assembly, server maintenance, microcontrollers, digital electronics', 'Hardware technician, network support specialist, system administrator, network engineer, hardware consultant, IT repair entrepreneur', '/uploads/computer_lab.jpg', 'published'),
('DAE Dress Designing & Making (Level 5)', 'dae-dress-designing-making-level-5', '3 Years (6 Semesters)', 'Matric (Science / Arts) or equivalent', '3-year Diploma of Associate Engineer (DAE) in Dress Designing & Making (Level 5) — specializing in garment designing, fashion illustration, pattern drafting, and production.', 'The DAE Dress Designing & Making (Level 5) is a three-year diploma program offering advanced technical and creative training in fashion illustration, pattern drafting, garment construction, fabric science, textile embellishment, draping, and boutique management. This program is aligned with NAVTTC and KPBTE national qualification standards (Level 5), preparing graduates for industrial fashion roles, apparel production management, or self-employment.', 'Fashion illustration, pattern drafting, draping, fabric selection, garment construction, machine sewing, embroidery, quality control, boutique management', 'Fashion designer, apparel supervisor, pattern master, boutique owner, costume designer, industrial apparel inspector, self-employed fashion designer', '/uploads/dress_design_class2.jpg', 'published'),
('Diploma in Information Technology (DIT)', 'diploma-information-technology-dit', '1 Year (2 Semesters)', 'Matric or equivalent', '1-year comprehensive diploma program covering database systems, web development, office tools, and networking foundations.', 'The Diploma in Information Technology (DIT) is a highly practical one-year program designed to equip students with core IT skills. The program covers computer applications, database management systems, web design and development (HTML, CSS, JavaScript), programming concepts, graphic design basics, and IT support. Aligned with KPBTE standards, it is a key credential for entering the modern IT workforce.', 'Database administration, web design, office automation, computer networking, programming basics, graphic design, operating systems', 'IT assistant, database operator, junior web developer, office coordinator, technical support representative', '/uploads/typing.jpg', 'published'),
('Beauty & Hair Therapy (Level-2)', 'beauty-hair-therapy-level-2', '6 Months', 'Middle or Matric', '6-month CBT (RPL) program focusing on professional skincare, hair styling, bridal makeup, salon management, and client hygiene.', 'The Beauty & Hair Therapy (Level-2) is a Competency-Based Training (CBT) program, also available via Recognition of Prior Learning (RPL). It covers modern skin treatments, hair styling, coloring techniques, professional makeup, manicure, pedicure, and salon ethics. It aims to turn passion into professional salon-grade expertise with international compliance standards.', 'Facial treatments, bridal makeup, hair styling, hair coloring, manicures, salon hygiene, client consulting', 'Beautician, hair stylist, makeup artist, salon assistant, bridal makeup expert, self-employed salon owner', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop', 'published'),
('Fashion Designing (Level-2)', 'fashion-designing-level-2', '6 Months', 'Middle or Matric', '6-month CBT (RPL) program covering introductory design principles, basic sketching, pattern making, and garment tailoring.', 'The Fashion Designing (Level-2) Competency-Based Training program provides core competencies in fashion design. Students learn basic fashion sketching, fabric identification, standard pattern creation, industrial machine operation, and stitching techniques. This course offers an entry-level pathway to apparel careers or home-based fashion boutique startup.', 'Basic fashion sketching, pattern cutting, machine stitching, fabric styling, garment assembly, design concepts', 'Tailoring specialist, design assistant, pattern maker assistant, boutique partner, home-based stylist', '/uploads/bedsheet_cushion_curtains.jpg', 'published'),
('Computer Operator (Level-2)', 'computer-operator-level-2', '6 Months', 'Matric or Middle', '6-month CBT (RPL) course for office productivity, professional typing, data management, and computer operations.', 'The Computer Operator (Level-2) program trains students in office productivity suites, data entry operations, internet communication, and basic hardware handling. Graduates are proficient in word processing, spreadsheets, presentations, and electronic record keeping according to standard administrative practices.', 'Word processing, spreadsheet calculations, data entry, professional typing, internet communication, system operations', 'Data entry operator, computer operator, front desk coordinator, office clerk, administrative assistant', '/uploads/computer_lab.jpg', 'published'),
('AutoCAD (Computer-Aided Design)', 'autocad-computer-aided-design', '6 Months', 'Matric or equivalent', '6-month practical CAD course focusing on 2D drafting, 3D modeling, blueprints, and architectural layouts.', 'Our AutoCAD course teaches professional Computer-Aided Design (CAD) workflows. Students master 2D drafting, drawing scaling, projection, architectural layouts, engineering drawings, and basic 3D rendering. It is designed for students seeking careers in civil design, architecture, interior decoration, and construction drafting.', '2D drafting, 3D modeling, blueprint reading, structural layout, design annotation, CAD scaling, rendering', 'CAD draftsman, design assistant, drafting technician, architectural renderer, planning assistant', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop', 'published'),
('Architecture Assistantship', 'architecture-assistantship', '6 Months', 'Matric or equivalent', '6-month vocational course in architectural drafting, building materials, layout planning, and interior design basics.', 'The Architecture course provides fundamental training in architectural drafting, scale drawings, structural planning, building construction materials, and interior layouts. Aligned with modern drafting requirements, students gain the competency to assist senior architects, designers, and site managers.', 'Architectural drafting, layout planning, material selection, interior layout design, scale calculation, drawing interpretation', 'Architect assistant, interior design trainee, building layout planner, architectural model builder', 'https://images.unsplash.com/photo-1503387762-592dedb8c310?q=80&w=900&auto=format&fit=crop', 'published'),
('Graphics Designing (Level 3)', 'graphics-designing-level-3', '6 Months', 'Matric or equivalent', '6-month CBT (RPL) Level 3 course in digital media, branding, vector design, and photo manipulation.', 'The Graphics Designing (Level 3) course is an advanced competency-based program. Students learn vector drawing (Adobe Illustrator), image editing and manipulation (Adobe Photoshop), desktop publishing (InDesign), brand styling, typography, and advertising layouts. It is geared towards creating professional freelance graphic designers and agency ready experts.', 'Vector design, branding, photo manipulation, layout design, typography, color theory, portfolio design', 'Freelance graphic designer, UI assistant, brand visualizer, desktop publisher, creative designer', 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop', 'published'),
('Web Development (Level 3)', 'web-development-level-3', '6 Months', 'Matric or equivalent', '6-month CBT (RPL) Level 3 course in modern frontend development, HTML5, CSS3, JavaScript, and responsive design.', 'The Web Development (Level 3) course covers modern frontend web technologies. Students build responsive websites using semantic HTML5, CSS3 styling with flexbox/grid layout, interactive Javascript, and source control using Git. It provides a solid foundation for aspiring frontend developers and freelance web builders.', 'HTML5, CSS3, JavaScript, responsive design, Git, CSS frameworks, hosting, DOM manipulation', 'Frontend developer, web designer, freelance web developer, site maintainer, web content coordinator', 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=900&auto=format&fit=crop', 'published');

INSERT INTO announcements (title, description, category, date, is_important, status)
VALUES
('Admissions Open for Technical and Vocational Courses', 'Applications are invited for current session courses. Interested students should visit the admission office with required documents.', 'Admission', CURDATE(), TRUE, 'published'),
('Skill Development Workshop Schedule', 'Workshop dates for practical training sessions will be shared with enrolled students by the training office.', 'Academics', CURDATE(), FALSE, 'published');

TRUNCATE TABLE gallery;
INSERT INTO gallery (title, category, image)
VALUES
('Computer Lab Setup', 'Labs', '/uploads/computer_lab.jpg'),
('Classroom Session', 'Classrooms', '/uploads/classroom.jpg'),
('Practical Keyboard Typing', 'Workshops', '/uploads/typing.jpg'),
('Student Guidance & Counseling', 'Administration', '/uploads/staff_meeting.jpg'),
('Main Campus Entrance', 'Campus', '/uploads/entrance.jpg'),
('DAE Dress Designing & Making Class', 'Workshops', '/uploads/dress_design_class2.jpg'),
('Urdu AI Workshop Session', 'Workshops', '/uploads/urduai_workshop.jpg'),
('NAVTTC Internal Accreditation Audit Meeting', 'Administration', '/uploads/navttc_accreditation.jpg'),
('Urdu AI Workshop Group Photo', 'Workshops', '/uploads/urduai_group.jpg'),
('Examination Hall', 'Classrooms', '/uploads/examination_hall.png'),
('Bedsheet, Cushion & Curtains Making Class', 'Workshops', '/uploads/bedsheet_cushion_curtains.jpg'),
('Parent-Teacher Meeting Session', 'Administration', '/uploads/parents_teacher_meeting.jpg'),
('Cluster-Based Training Monitoring Session', 'Administration', '/uploads/monitoring_visit_cluster.png'),
('International Women''s Day 2026 Seminar', 'Events', '/uploads/womens_day_classroom.jpg'),
('International Women''s Day 2026 Banner', 'Events', '/uploads/womens_day_banner.png'),
('State Bank of Pakistan (SBP) Entrepreneurship Seminar', 'Events', '/uploads/sbp_bank_session.png'),
('Students Practicing on Sewing Machines', 'Workshops', '/uploads/practical_work_sewing1.png'),
('Dress Designing Practical Sewing Class', 'Workshops', '/uploads/practical_work_sewing2.jpg'),
('Student Hand Embroidery Flower Pattern', 'Workshops', '/uploads/embroidery_work1.jpg'),
('Ribbon Rose Embroidery Sample Work', 'Workshops', '/uploads/embroidery_work2.jpg'),
('Independence Day Celebration Ceremony', 'Events', '/uploads/independence_day_14august.jpg'),
('Students Planting Saplings on Campus', 'Events', '/uploads/plantation_activity1.jpg'),
('Tree Plantation Drive Close-up', 'Events', '/uploads/plantation_activity2.jpg'),
('Student Food Stall at Annual Exhibition', 'Events', '/uploads/exhibition_food.jpg'),
('Handmade Hair Accessories Stall', 'Events', '/uploads/exhibition_accessories.jpg'),
('Customized Name Bracelets & Jewelry Stall', 'Events', '/uploads/exhibition_jewelry.jpg'),
('Paintings and Calligraphy Art Display', 'Events', '/uploads/exhibition_art.jpg'),
('Dress Designing and Apparel Display Stall', 'Events', '/uploads/exhibition_clothing.jpg'),
('Paintings & Calligraphy Art Exhibition', 'Events', '/uploads/art_exhibition_blurred.jpg'),
('Students Checking Results on Exam Notice Board', 'Administration', '/uploads/internal_exam_controller.jpg'),
('Student Still Life Flower Painting', 'Workshops', '/uploads/student_art_flower.png'),
('Student Bald Eagle Portrait Painting', 'Workshops', '/uploads/student_art_eagle.png'),
('Student Drapery Study Painting', 'Workshops', '/uploads/student_art_drapery.png'),
('Student Bookshelf and Books Painting', 'Workshops', '/uploads/student_art_bookshelf.jpg'),
('Official Admission Open Advertisement Flyer', 'Advertisement', '/uploads/admission_advertisement.jpg');
