# BlogVerse — MERN Stack Blog Platform

A full-stack blog posting platform built with MongoDB, Express.js, React.js, and Node.js.

---

## Project Structure

```
blog-platform/
├── backend/                  # Node.js + Express API
│   ├── models/
│   │   ├── User.js           # User schema (bcrypt passwords)
│   │   ├── Blog.js           # Blog schema (likes, views, tags)
│   │   └── Comment.js        # Comment schema (nested replies)
│   ├── routes/
│   │   ├── auth.js           # /api/auth  — register, login, me
│   │   ├── blogs.js          # /api/blogs — CRUD + like
│   │   ├── comments.js       # /api/comments — CRUD + like
│   │   └── users.js          # /api/users — profiles + admin
│   ├── middleware/
│   │   └── auth.js           # JWT protect + adminOnly
│   ├── .env.example          # Environment variable template
│   ├── server.js             # Express app entry point
│   └── package.json
│
└── frontend/                 # React.js SPA
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global auth state + axios config
    │   ├── components/
    │   │   ├── Navbar.jsx        # Responsive navigation
    │   │   └── BlogCard.jsx      # Reusable blog card
    │   ├── pages/
    │   │   ├── Home.jsx          # Blog feed with search + filter
    │   │   ├── Login.jsx         # JWT login form
    │   │   ├── Register.jsx      # User registration form
    │   │   ├── BlogDetail.jsx    # Full blog + comments
    │   │   ├── CreateBlog.jsx    # Write + preview blog
    │   │   ├── EditBlog.jsx      # Edit existing blog
    │   │   ├── Dashboard.jsx     # User stats + blog management
    │   │   └── Profile.jsx       # Public profile + edit own
    │   ├── App.jsx               # Routes + private route guard
    │   └── index.js              # React root + Toaster
    └── package.json
```

---

## Features

| Module             | Features                                             |
|--------------------|------------------------------------------------------|
| User Authentication | Register, Login, JWT tokens, Protected routes       |
| Blog Management    | Create, Edit, Delete, Draft/Publish, Cover images   |
| Content            | Categories, Tags, Auto excerpt, Read-time estimate  |
| Interaction        | Like/Unlike blogs, Comments, Nested replies         |
| Discovery          | Full-text search, Category filter, Pagination       |
| Profiles           | Public profiles, Edit own bio/avatar, Stats         |
| Dashboard          | Blog stats (views, likes), Manage own content       |
| Admin Control      | Admin role, Delete any blog/comment/user            |

---

## Prerequisites

- **Node.js** v18+
- **MongoDB** — local (`mongodb://localhost:27017`) or [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Setup & Run

### 1. Clone / extract the project

```bash
cd blog-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogplatform
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRE=7d
NODE_ENV=development
```

Start the backend:
```bash
npm run dev      # development (nodemon)
# or
npm start        # production
```

Backend runs on **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

The `"proxy": "http://localhost:5000"` in `frontend/package.json` automatically forwards all `/api/*` calls to the backend.

---

## API Endpoints

### Auth
| Method | Endpoint          | Access  | Description          |
|--------|-------------------|---------|----------------------|
| POST   | /api/auth/register | Public | Register new user    |
| POST   | /api/auth/login   | Public  | Login, returns JWT   |
| GET    | /api/auth/me      | Private | Get current user     |

### Blogs
| Method | Endpoint              | Access        | Description               |
|--------|-----------------------|---------------|---------------------------|
| GET    | /api/blogs            | Public        | List blogs (search/filter/paginate) |
| GET    | /api/blogs/my         | Private       | Current user's blogs      |
| GET    | /api/blogs/:id        | Public        | Get single blog           |
| POST   | /api/blogs            | Private       | Create blog               |
| PUT    | /api/blogs/:id        | Owner/Admin   | Update blog               |
| DELETE | /api/blogs/:id        | Owner/Admin   | Delete blog               |
| PUT    | /api/blogs/:id/like   | Private       | Toggle like               |

### Comments
| Method | Endpoint                  | Access      | Description          |
|--------|---------------------------|-------------|----------------------|
| GET    | /api/comments/:blogId     | Public      | Get blog's comments  |
| POST   | /api/comments/:blogId     | Private     | Add comment/reply    |
| DELETE | /api/comments/:id         | Owner/Admin | Delete comment       |
| PUT    | /api/comments/:id/like    | Private     | Toggle like          |

### Users
| Method | Endpoint                   | Access  | Description          |
|--------|----------------------------|---------|----------------------|
| GET    | /api/users/:id             | Public  | Get user profile     |
| GET    | /api/users/:id/blogs       | Public  | Get user's blogs     |
| PUT    | /api/users/profile/update  | Private | Update own profile   |
| GET    | /api/users                 | Admin   | List all users       |
| DELETE | /api/users/:id             | Admin   | Delete user          |

---

## Tech Stack

| Layer    | Technology              | Purpose                    |
|----------|-------------------------|----------------------------|
| Frontend | React.js 18             | Component-based UI         |
| Routing  | React Router v6         | Client-side navigation     |
| HTTP     | Axios                   | API requests               |
| Backend  | Node.js + Express.js    | REST API server            |
| Database | MongoDB + Mongoose      | Document storage           |
| Auth     | JWT + bcryptjs          | Secure authentication      |
| Toasts   | react-hot-toast         | User notifications         |
| Fonts    | Google Fonts (Outfit, Sora) | Typography              |

---

## Environment Variables

| Variable       | Description                        | Default                              |
|----------------|------------------------------------|--------------------------------------|
| PORT           | Backend server port                | 5000                                 |
| MONGODB_URI    | MongoDB connection string          | mongodb://localhost:27017/blogplatform |
| JWT_SECRET     | Secret key for JWT signing         | (required — change this!)            |
| JWT_EXPIRE     | Token expiry duration              | 7d                                   |
| NODE_ENV       | Environment mode                   | development                          |

---

## Deployment

### Backend (e.g. Render / Railway)
1. Set environment variables in the platform dashboard
2. Set `NODE_ENV=production`
3. Start command: `node server.js`

### Frontend (e.g. Vercel / Netlify)
1. Build: `npm run build`
2. Set `REACT_APP_API_URL=https://your-backend-url.com`
3. The `AuthContext.jsx` uses this env variable as the axios base URL

---

## Presented By
- V. Sivaram Prakash (24B11AI443)
- U. Brijesh Reddy (24B11AI434)
- T. Koushik (24B11AI427)
