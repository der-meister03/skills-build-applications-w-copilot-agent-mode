import React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 20% 20%, #f6f4ee 0%, #e9f3f0 35%, #d6e4f6 100%)',
      }}
    >
      <div className="container py-4 py-md-5">
        <header className="mb-4">
          <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3">
            <div>
              <p className="text-uppercase fw-semibold text-secondary mb-1">OctoFit Tracker</p>
              <h1 className="display-6 fw-bold mb-2">Presentation Tier</h1>
              <p className="text-secondary mb-0">
                Explore users, teams, activities, workouts, and leaderboard data from the API tier.
              </p>
            </div>
            <div className="small text-secondary">
              Routes use <code>/api/[component]/</code> with safe fallback when Codespaces env is unset.
            </div>
          </div>
        </header>

        <nav className="mb-4">
          <ul className="nav nav-pills gap-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link className="nav-link" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <main className="card border-0 shadow-sm">
          <div className="card-body p-3 p-md-4">
            <Routes>
              <Route path="/" element={<Navigate to="/activities" replace />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
