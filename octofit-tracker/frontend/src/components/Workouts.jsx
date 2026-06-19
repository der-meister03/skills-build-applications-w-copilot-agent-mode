import React, { useEffect, useMemo, useState } from 'react';

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;

  const firstArrayEntry = Object.values(payload).find(Array.isArray);
  return Array.isArray(firstArrayEntry) ? firstArrayEntry : [];
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    return codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';
  }, []);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <p className="text-secondary small mb-3">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-info mb-0">Loading workouts...</div>}
      {error && <div className="alert alert-danger mb-0">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-secondary py-4">
                    No workouts found.
                  </td>
                </tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout._id || workout.id || index}>
                    <td>{workout.title || 'Untitled'}</td>
                    <td>{workout.date ? new Date(workout.date).toLocaleDateString() : '-'}</td>
                    <td>{workout.duration ?? '-'}</td>
                    <td>{workout.caloriesBurned ?? workout.calories ?? '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
