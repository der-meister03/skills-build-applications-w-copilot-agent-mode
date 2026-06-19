# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port 5173)
└── backend/           # Node.js + Express + TypeScript (Port 8000)
```

## Prerequisites

- Node.js 18+ (for both frontend and backend)
- MongoDB 5.0+ (running on port 27017)
- npm or yarn package manager

## Setup Instructions

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The backend will be available at `http://localhost:8000`

### MongoDB Setup

Ensure MongoDB is running on `localhost:27017`:

```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or using local MongoDB installation
mongod --port 27017
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=8000
NODE_ENV=development
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - API health check

## Technology Stack

### Frontend
- **React** 19 - Modern UI library
- **Vite** - Fast build tool and dev server
- **JavaScript/JSX** - Component development

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management

## Development

Both frontend and backend run in watch mode during development:

```bash
# Terminal 1: Start MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Terminal 2: Start Backend
cd octofit-tracker/backend && npm run dev

# Terminal 3: Start Frontend
cd octofit-tracker/frontend && npm run dev
```

The application is ready to extend with fitness tracking features!
