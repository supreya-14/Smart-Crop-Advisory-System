# 🌾 Smart Crop Advisory System

A full-stack, AI-powered web application that helps farmers get personalized crop
recommendations, weather-based advisory, disease detection guidance, and a farming
chatbot — all in one simple platform.

Built with **React + Vite + Tailwind CSS** (frontend), **Node.js + Express + MongoDB**
(backend), **Google Gemini API** (AI), and **OpenWeatherMap API** (weather data).

---

## 1. Folder Structure

```
smart-crop-advisory/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Register/Login/Profile
│   │   ├── farmController.js        # Farm CRUD
│   │   ├── cropController.js        # Crop catalog CRUD
│   │   ├── advisoryController.js    # AI advisory logic
│   │   └── chatController.js        # AI chatbot logic
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT protect + adminOnly
│   │   ├── errorMiddleware.js       # Centralized error handling
│   │   └── validators.js            # express-validator rules
│   ├── models/
│   │   ├── User.js
│   │   ├── Farm.js
│   │   ├── Crop.js
│   │   ├── Advisory.js
│   │   └── ChatHistory.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── farmRoutes.js
│   │   ├── cropRoutes.js
│   │   ├── advisoryRoutes.js
│   │   └── chatRoutes.js
│   ├── services/
│   │   ├── geminiService.js         # Gemini AI API calls
│   │   └── weatherService.js        # OpenWeatherMap API calls
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── leaf.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/             # Hero, Features, HowItWorks, CTA
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdvisoryCard.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── dashboard/
│   │   │       ├── Overview.jsx
│   │   │       ├── Farms.jsx
│   │   │       ├── CropAdvisory.jsx
│   │   │       ├── WeatherAdvisory.jsx
│   │   │       ├── DiseaseGuidance.jsx
│   │   │       ├── Chatbot.jsx
│   │   │       ├── AdvisoryHistory.jsx
│   │   │       └── Profile.jsx
│   │   ├── services/
│   │   │   └── api.js               # Axios instance
│   │   ├── App.jsx                  # All routes
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Tailwind + custom styles
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .env.example                     # Reference of all env vars
└── README.md
```

---

## 2. Commands to Install Dependencies

Open two terminals — one for backend, one for frontend.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

---

## 3. Environment Variables

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and fill in:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
WEATHER_API_KEY=your_openweathermap_api_key_here
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env` and fill in:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 4. How to Run the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start at `http://localhost:5000`. You should see:
```
MongoDB Connected: <your-cluster-host>
Server running on port 5000
```

---

## 5. How to Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`. Open this URL in your browser.

> Make sure the backend is running first, since the frontend calls its API.

---

## 6. How to Connect MongoDB Atlas

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new **Cluster** (the free M0 tier is enough).
3. Under **Database Access**, create a database user with a username and password.
4. Under **Network Access**, add your IP address (or `0.0.0.0/0` to allow access from anywhere — useful for deployment).
5. Click **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user credentials, and add your database name before the `?`, e.g.:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/crop-advisory?retryWrites=true&w=majority
   ```
7. Paste this into `backend/.env` as `MONGO_URI`.

---

## 7. How to Add the Gemini API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **Create API Key** and copy the generated key.
4. Paste it into `backend/.env` as:
   ```
   GEMINI_API_KEY=your_copied_key_here
   ```

---

## 8. How to Add the Weather API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api) and create a free account.
2. Navigate to **My API Keys** in your account dashboard.
3. Copy your default API key (it may take a few minutes to activate after signup).
4. Paste it into `backend/.env` as:
   ```
   WEATHER_API_KEY=your_copied_key_here
   ```

---

## 9. How to Deploy

### Deploy Backend on Render

1. Push your project to a GitHub repository.
2. Go to [https://render.com](https://render.com) → **New** → **Web Service**.
3. Connect your GitHub repo and select the `backend` folder as the root directory.
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all environment variables from `backend/.env` in Render's **Environment** tab.
6. Set `CLIENT_URL` to your deployed frontend URL (from Vercel, step below) to allow CORS.
7. Click **Create Web Service**. Render will give you a live backend URL like:
   ```
   https://your-app-name.onrender.com
   ```

### Deploy Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com) → **New Project**.
2. Import your GitHub repository and set the **Root Directory** to `frontend`.
3. Vercel auto-detects Vite — keep default build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add an environment variable:
   ```
   VITE_API_URL=https://your-app-name.onrender.com/api
   ```
   (use your Render backend URL from above)
5. Click **Deploy**. Vercel will give you a live frontend URL like:
   ```
   https://your-app-name.vercel.app
   ```
6. Go back to Render and update `CLIENT_URL` to this Vercel URL, then redeploy the backend so CORS allows it.

### Deploy Database on MongoDB Atlas
Already covered in section 6 — Atlas is a cloud service, so no separate deployment step is needed once your cluster is set up and the connection string is added to Render's environment variables.

---

## API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get logged-in user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| POST | `/api/farms` | Add a new farm | Yes |
| GET | `/api/farms` | Get all farms of logged-in user | Yes |
| GET | `/api/farms/:id` | Get single farm | Yes |
| PUT | `/api/farms/:id` | Update farm | Yes |
| DELETE | `/api/farms/:id` | Delete farm | Yes |
| GET | `/api/crops` | Get all crops in catalog | Yes |
| POST | `/api/crops` | Add crop to catalog | Yes (Admin) |
| DELETE | `/api/crops/:id` | Delete crop from catalog | Yes (Admin) |
| POST | `/api/advisory/crop-recommendation` | Get AI crop recommendation | Yes |
| POST | `/api/advisory/weather-advisory` | Get weather-based advisory | Yes |
| POST | `/api/advisory/disease-guidance` | Get disease guidance | Yes |
| GET | `/api/advisory/history` | Get advisory history | Yes |
| POST | `/api/chat` | Send message to AI chatbot | Yes |
| GET | `/api/chat/history` | Get chat history | Yes |

**Auth header format:** `Authorization: Bearer <your_jwt_token>`

---

## Tech Stack Summary

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Axios, Lucide Icons
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Atlas)
- **Auth:** JWT + bcrypt
- **AI:** Google Gemini API (`gemini-2.0-flash`)
- **Weather:** OpenWeatherMap API
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Notes for Beginners

- All backend code follows a simple **Controller → Service → Model** pattern — no complex design patterns.
- Every file has comments explaining what it does and why.
- Passwords are never stored in plain text — they're hashed with `bcryptjs`.
- JWT tokens are stored in the browser's `localStorage` and automatically attached to every API request via an Axios interceptor (see `frontend/src/services/api.js`).
- Dark/Light mode is handled with a simple React Context + a CSS class on the `<html>` tag — no external libraries needed.
- If any AI or Weather API call fails (e.g. wrong API key), the app shows a friendly error message instead of crashing.
