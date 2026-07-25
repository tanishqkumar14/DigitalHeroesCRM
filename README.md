## ✨ Highlights

- MERN Stack CRM Application ( TEST CASE FOR DIGITAL HEROES )
- JWT Authentication & Role-Based Authorization
- Lead Management (CRUD)
- Dashboard with Analytics
- Notification System
- Public Lead Capture Form
- Fully Deployed (Frontend + Backend)
- Responsive UI
 

 # 🚀 Digital Heroes CRM

A modern Customer Relationship Management (CRM) application built using the MERN Stack. The application enables organizations to manage leads efficiently with authentication, role-based access, notifications, analytics, and a public lead capture form.

## 🌐 Live Demo

**Frontend:** https://digitalheroescrm.onrender.com

**Backend API:** https://digitalheroescrm-api.onrender.com

**GitHub Repository:** https://github.com/tanishqkumar14/DigitalHeroesCRM

---

# 📖 Features

### 🔐 Authentication & Authorization
- JWT Authentication
- Secure Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (Admin & Member)

### 👥 Lead Management
- Create Lead
- View Leads
- Edit Lead
- Delete Lead (Admin Only)
- Search Leads
- Filter Leads
- Pagination

### 📊 Dashboard
- Total Leads
- New Leads
- Contacted Leads
- Qualified Leads
- Converted Leads
- Interactive Charts

### 🔔 Notifications
- Lead Created
- Lead Updated
- Lead Deleted
- Unread Notification Count
- Mark Individual Notification as Read
- Mark All Notifications as Read

### 🌍 Public Lead Form
- Public lead submission page
- No authentication required
- Automatically stores leads in the database

### 🎨 UI
- Responsive Design
- Modern Interface
- Tailwind CSS
- ShadCN UI Components

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- ShadCN UI
- Axios
- React Router

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## Deployment

- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas

---

# 📂 Project Structure

```
DigitalHeroesCRM
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/tanishqkumar14/DigitalHeroesCRM.git
```

```bash
cd DigitalHeroesCRM
```

---

# Backend Setup

```bash
cd server
npm install
```

Create a `.env` file

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Start Backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd client
npm install
```

Create a `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

# Production Environment Variable

```env
VITE_API_URL=https://digitalheroescrm-api.onrender.com/api
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Leads

| Method | Endpoint |
|----------|------------------------|
| GET | /api/leads |
| POST | /api/leads |
| PUT | /api/leads/:id |
| DELETE | /api/leads/:id |
| POST | /api/leads/public |

---

## Dashboard

| Method | Endpoint |
|----------|------------------------|
| GET | /api/dashboard |

---

## Notifications

| Method | Endpoint |
|----------|----------------------------|
| GET | /api/notifications |
| PUT | /api/notifications/:id/read |
| PUT | /api/notifications/read-all |

---

# User Roles

### Admin

- Full Access
- Delete Leads
- Manage All Leads
- View Dashboard
- Notifications

### Member

- Create Leads
- Update Leads
- View Dashboard
- Notifications

---

# Screenshots

### Login 
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/38ad2c86-6838-4b1f-9c79-af32b83f4593" />

### Dashboard
<img width="1897" height="1078" alt="image" src="https://github.com/user-attachments/assets/76d63821-4749-46be-8ea3-5ceca0f6d3d2" />
<img width="1901" height="931" alt="image" src="https://github.com/user-attachments/assets/5bb78725-c541-4c72-b423-78bc0d10e9fc" />
<img width="1842" height="932" alt="image" src="https://github.com/user-attachments/assets/9e756f8e-d19b-4353-998d-9ed7364719ee" />

### Leads
<img width="1892" height="1078" alt="image" src="https://github.com/user-attachments/assets/ad5684ee-641d-456c-bbef-870a812ea32f" />


### Notifications
<img width="1911" height="622" alt="image" src="https://github.com/user-attachments/assets/f25568d0-ed09-404a-9c96-5bdbd1828ee0" />


### Public Lead Form
<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/be4c10d1-9c9c-4ba3-b0b5-0e76962c1aa5" />


---

# Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role-Based Authorization
- Environment Variables

---

# Future Improvements

- Email Notifications
- CSV Export
- Lead Assignment
- Activity Logs
- Password Reset
- Dark Mode
- Unit Testing

---

# Author

**Tanishq Kumar**

GitHub:
https://github.com/tanishqkumar14

LinkedIn:
https://www.linkedin.com/in/tanishq-kumar-5b7b88224

---

# License

This project was developed as part of the **Digital Heroes Full Stack Developer Assessment**.
