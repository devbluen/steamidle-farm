# 🎮 SteamIdle Farm

<p align="center">
  <img src="frontend/src/assets/logo.png" width="100" />
</p>

<p align="center">
  <strong>Farm your Steam hours effortlessly</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
</p>

---

## 📖 About

**SteamIdle Farm** is a local web application that simulates games running on your Steam account to automatically accumulate hours. It uses real-time communication via **WebSocket** between a **React** frontend and a **Node.js** backend that connects directly to Steam's servers.

---

## ✨ Features

- 🔐 Secure login with **Steam Guard** support
- 🔄 Automatic reconnection via **refresh token**
- 🔍 Real-time game search using the **Steam API**
- 🎮 Simulate up to **32 games** running simultaneously
- ⏱️ **Per-game timer** with hourly progress bar
- 🟢 Real-time connection status
- 🔔 Toast notifications for system events

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Communication | WebSocket (ws) |
| Backend | Node.js |
| Steam | steam-user |
| Environment | dotenv |
| Notifications | react-hot-toast |

---

## 📦 Installation

### Requirements
- [Node.js](https://nodejs.org/) v18 or higher
- Steam account

### 1. Clone the repository
```bash
git clone https://github.com/EliPe0/steamidle-farm.git
cd steamidle-farm
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
STEAM_USERNAME=your_steam_username
STEAM_PASSWORD=your_steam_password
```

### 3. Setup the Frontend
```bash
cd ../frontend
npm install
```

---

## 🚀 Usage

### 1. Start backend and frontend

From the root folder, if you have Windows Terminal installed:
```bash
start.bat
```

Or manually in two separate terminals:
```bash
# Terminal 1 - Backend
cd backend
node index.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Open the app

Go to `http://localhost:5173` in your browser.

### 3. Connect to Steam

- Click **Connect**
- If prompted, enter your **Steam Guard** code
- Once connected, search for games you want to farm
- Click **+** to add them to your active list

---

## ⚠️ Disclaimer

This project is for personal use only. The use of idling software may violate Steam's Terms of Service. Use at your own risk.

---

## 📄 License

MIT © [EliPe0](https://github.com/EliPe0)