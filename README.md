# AI Feedback Analyzer 🚀

AI-powered customer feedback analytics dashboard built using Next.js, Node.js, MongoDB, TypeScript, and Groq AI.

---

# Features ✨

- AI sentiment analysis
- AI category detection
- Urgency prediction
- AI-generated summaries
- Topic extraction
- Dashboard analytics
- Pie charts & bar charts
- Search & filtering
- Edit/Delete feedback
- CSV & JSON bulk upload
- Responsive premium UI
- Insights dashboard
- Topic tag analytics

---

# Tech Stack 🛠️

## Frontend
- Next.js
- TypeScript
- TailwindCSS
- Axios
- Recharts
- Lucide React
- Sonner

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Multer
- CSV Parser
- Groq AI

---

# Project Structure 📁

```bash
client/
server/
```

---

# Setup Instructions ⚡

## 1. Clone Repository

```bash
git clone <repo-url>
```

---

## 2. Install Frontend

```bash
cd client
npm install
```

---

## 3. Install Backend

```bash
cd server
npm install
```

---

# Environment Variables 🔐

Create `.env` inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_url

GROQ_API_KEY=your_groq_api_key
```

---

# Run Backend 🚀

```bash
cd server
npm run dev
```

---

# Run Frontend 🚀

```bash
cd client
npm run dev
```

---

# API Routes 📡

## Feedback APIs

| Method | Route |
|---|---|
| GET | /api/feedback |
| GET | /api/feedback/:id |
| POST | /api/feedback |
| PUT | /api/feedback/:id |
| DELETE | /api/feedback/:id |

---

## Insights API

| Method | Route |
|---|---|
| GET | /api/feedback/insights |

---

## Bulk Upload API

| Method | Route |
|---|---|
| POST | /api/feedback/bulk-upload |

---

# Sample CSV 📄

```csv
message,email,source
App crashes during payment,user1@gmail.com,app_store
Amazing UI and smooth experience,user2@gmail.com,support
Need dark mode feature,user3@gmail.com,survey
```

---

# Future Improvements 🚀

- Authentication
- Export reports
- Pagination
- AI chat assistant
- Real-time analytics

---

# Author ❤️

Priti Chauhan