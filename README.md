# Government Polytechnic Institute for Women - GPI W D.I. Khan

Complete Next.js website for an official educational institute with public pages, REST APIs, MySQL database, image uploads, authentication, and an admin dashboard.

## Features

- Responsive public website with Home, About, Courses, Announcements, Gallery, Admission, Facilities, Alumni Portal, and Contact pages
- MySQL-backed courses, announcements, gallery, alumni, contact messages, and site settings
- Secure admin login with JWT cookie authentication and bcrypt password hashes
- Admin dashboard for managing courses, announcements, gallery images, alumni approvals, contact messages, site settings, and admin profile
- Safe upload endpoint for gallery/course images and attachments
- Tailwind CSS institutional theme using deep green, white, and gold

## Setup

1. Install Node.js 20+ and MySQL.
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example` and update database credentials:

```bash
cp .env.example .env
```

4. Create the database and seed starter content:

```bash
mysql -u root -p < database/schema.sql
```

5. Create or update an admin user:

```bash
node scripts/create-admin.mjs admin@gpiw.edu.pk StrongPassword123 "Administrator"
```

6. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` for the website and `http://localhost:3000/admin/login` for the admin dashboard.

## Important Paths

- Public pages: `app/`
- API routes: `app/api/`
- Reusable UI: `components/`
- Database/auth/upload helpers: `lib/`
- MySQL schema: `database/schema.sql`
- Uploaded files: `public/uploads/`

## Production Notes

- Set a long random `JWT_SECRET`.
- Configure MySQL backups.
- Put uploaded files on durable storage for production hosting.
- Replace placeholder phone/email/address and map embed with verified institute details.
- Use HTTPS so admin cookies are transmitted securely.
