import React, { useEffect, useMemo, useState } from 'react';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';
}

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;

  const firstArrayEntry = Object.values(payload).find(Array.isArray);
  return Array.isArray(firstArrayEntry) ? firstArrayEntry : [];
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = useMemo(() => `${getApiBaseUrl()}/leaderboard/`, []);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <p className="text-secondary small mb-3">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-info mb-0">Loading leaderboard...</div>}
      {error && (
        <div className="alert alert-warning mb-0">
          {error}
          <div className="small mt-2">
            If this endpoint is not implemented in the backend yet, this message is expected.
          </div>
        </div>
      )}

      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {entries.length === 0 ? (
            <li className="list-group-item text-secondary">No ranking data found.</li>
          ) : (
            entries.map((entry, index) => (
              <li
                key={entry._id || entry.id || `${entry.userId || entry.username || 'entry'}-${index}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{entry.username || entry.name || `Athlete ${index + 1}`}</span>
                <strong>{entry.score ?? entry.points ?? entry.total ?? 0}</strong>
              </li>
            ))
          )}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
