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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
    return codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';
  }, []);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <p className="text-secondary small mb-3">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-info mb-0">Loading teams...</div>}
      {error && (
        <div className="alert alert-warning mb-0">
          {error}
          <div className="small mt-2">
            If this endpoint is not implemented in the backend yet, this message is expected.
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="row g-3">
          {teams.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-light border mb-0 text-secondary">No teams found.</div>
            </div>
          ) : (
            teams.map((team, index) => (
              <div className="col-12 col-md-6" key={team._id || team.id || index}>
                <article className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <h3 className="h6 mb-2">{team.name || `Team ${index + 1}`}</h3>
                    <p className="text-secondary small mb-0">
                      Members: {team.memberCount ?? team.members?.length ?? '-'}
                    </p>
                  </div>
                </article>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Teams;
