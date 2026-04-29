# 🎓 CollegeCompass — College Discovery Platform

A production-grade MVP for discovering, comparing, and predicting college admissions across India.

## ✅ Features Built

| Feature | Description |
|---|---|
| 🔍 College Listing + Search | Search by name/location, filter by State / Fees / Course, sort by NIRF/Rating/Fees, paginated (9 per page) |
| 🏫 College Detail Page | Overview, Courses, Placements, Reviews tabs with proper routing |
| ⚖️ Compare Colleges | Side-by-side comparison of up to 3 colleges with smart "best" highlighting and verdict |
| 🧠 Rank Predictor | Enter exam (JEE Advanced/Main/BITSAT/WBJEE) + rank → get eligible colleges with Excellent/Good/Moderate chance |

## 🧱 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + React Router + Axios
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB + Mongoose
- **Data**: 12 AI-generated realistic Indian colleges with full placement/course/review data

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`) OR MongoDB Atlas URI

---

### 1. Backend Setup

```bash
cd backend
npm install

# Edit .env if needed (default: mongodb://localhost:27017/collegeplatform)
# nano .env

# Seed the database with 12 colleges
npm run seed

# Start the server
npm start
# → Running on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Edit .env if needed (default: http://localhost:5000/api)
# nano .env

# Start the dev server
npm run dev
# → Running on http://localhost:5173
```

## 📁 Project Structure

```
college-platform/
├── backend/
│   ├── models/
│   │   └── College.js          # Mongoose schema
│   ├── routes/
│   │   └── colleges.js         # All API routes
│   ├── data/
│   │   └── colleges.js         # Mock dataset (12 colleges)
│   ├── server.js               # Express app entry
│   ├── seed.js                 # DB seeder
│   └── .env                    # MONGODB_URI, PORT
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── CollegeCard.jsx
        │   └── CompareBar.jsx   # Floating compare tray
        ├── context/
        │   └── CompareContext.jsx
        ├── pages/
        │   ├── CollegesPage.jsx    # Listing + search + filter
        │   ├── CollegeDetailPage.jsx
        │   ├── ComparePage.jsx
        │   └── PredictorPage.jsx
        ├── api.js               # Axios API calls
        └── App.jsx              # Router setup
```

---

## 🌐 Using MongoDB Atlas (Cloud)

1. Create a free cluster at https://cloud.mongodb.com
2. Get your connection string
3. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegeplatform
   ```
4. Run `npm run seed` again

---

## 🧪 Sample API Calls

```bash
# Get all colleges
curl http://localhost:5000/api/colleges

# Search for IIT colleges
curl "http://localhost:5000/api/colleges?search=IIT&sortBy=nirfRank"

# Filter by state and fees
curl "http://localhost:5000/api/colleges?state=Tamil+Nadu&maxFees=500000"

# Predict colleges for JEE Advanced rank 2500
curl "http://localhost:5000/api/colleges/predict?exam=JEE+Advanced&rank=2500"

# Compare 3 colleges (use real _id values from list)
curl "http://localhost:5000/api/colleges/compare?ids=ID1,ID2,ID3"
```
