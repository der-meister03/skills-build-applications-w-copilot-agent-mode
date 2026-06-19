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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    return codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
  }, []);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <p className="text-secondary small mb-3">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-info mb-0">Loading activities...</div>}
      {error && <div className="alert alert-danger mb-0">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-secondary py-4">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity._id || activity.id || index}>
                    <td>{activity.title || activity.name || 'Untitled'}</td>
                    <td>{activity.exerciseType || activity.type || '-'}</td>
                    <td>{activity.duration ?? '-'}</td>
                    <td>{activity.caloriesBurned ?? activity.calories ?? '-'}</td>
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

export default Activities;
