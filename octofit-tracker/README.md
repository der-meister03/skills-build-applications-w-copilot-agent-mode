# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port 5173)
├── backend/           # Node.js + Express + TypeScript (Port 8000)
└── README.md
```

## Technology Stack

### Frontend
- **React 19** - Latest React version
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **Port:** 5173

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **Mongoose** - MongoDB ODM
- **Port:** 8000

### Database
- **MongoDB** - NoSQL database
- **Port:** 27017

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running on localhost:27017)

### Installation

#### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

#### Backend Setup
```bash
cd octofit-tracker/backend
npm install
cp .env.example .env
npm run dev
```
The backend will be available at `http://localhost:8000`

### Environment Variables

Create a `.env` file in the backend directory:
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
FRONTEND_URL=http://localhost:5173
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run compiled application
- `npm run lint` - Run ESLint

## API Endpoints

- `GET /health` - Health check
- `GET /api` - API info

## Next Steps

1. Set up MongoDB locally or connect to a cloud instance
2. Configure environment variables
3. Start development servers
4. Begin building fitness tracking features

---

Built with ❤️ using GitHub Copilot Agent Mode
