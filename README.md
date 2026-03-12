# 🌌 ArthaVerse - AI-Powered Financial Intelligence Platform

ArthaVerse is a comprehensive full-stack financial management and simulation platform designed to empower business owners with AI-driven insights, risk predictions, and a modern "What-If" business simulator.

---

## 🚀 Key Features

- **Full-Stack Authentication**: Secure registration and login flow powered by Node.js and MongoDB.
- **Smart Registration**: Multi-step flow including mobile verification, name setup, PIN security, and bank linking.
- **AI Action Center**: Real-time financial recommendations based on business health.
- **What-If Simulator**: Interactive playground to simulate how expense changes and growth impact business risk.
- **Admin Portal**: Dedicated management interface for system monitoring and user oversight.
- **Premium UI**: Modern glassmorphism design with interactive area charts and smooth animations.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Recharts, React Icons, Vanilla CSS (Modern Design System).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **Styling**: Premium Glassmorphism, CSS Variables, Custom Animations.

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Optional, for easy data viewing)

---

## 🚦 Getting Started

### 1. Database Setup
Ensure your MongoDB service is running on your machine.
- Default path: `mongodb://127.0.0.1:27017/arthaverse`

### 2. Backend Installation & Run
```bash
cd backend
npm install
npm run dev
```
*The server will start on [http://localhost:5000](http://localhost:5000)*

### 3. Frontend Installation & Run
```bash
cd arthaverse
npm install
npm run dev
```
*The application will be accessible at [http://localhost:5173](http://localhost:5173)*

---

## 🔐 Admin Credentials
To access the Admin Panel, use the following credentials on the login screen:
- **Mobile Number**: `9898989898`
- **PIN**: `9999`

---

## 📁 Project Structure

```text
/
├── arthaverse/           # Frontend React Application
│   ├── src/
│   │   ├── pages/        # Dashboard, Login, Register
│   │   ├── components/   # Navbar, Sidebar, Layouts
│   │   └── admin/        # Admin specialized views
├── backend/              # Node.js Express Server
│   ├── server.js         # API Routes & DB Connection
│   └── .env              # Environment Variables
└── README.md
```

---

## 🤝 Contributing
Feel free to fork this project and contribute. For major changes, please open an issue first.

**Developed with ❤️ by ArthaVerse Team**
