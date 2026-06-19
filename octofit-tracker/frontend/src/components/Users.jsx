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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const endpoint = useMemo(() => `${getApiBaseUrl()}/users/`, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeListResponse(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [endpoint]);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <p className="text-secondary small mb-3">Endpoint: {endpoint}</p>

      {loading && <div className="alert alert-info mb-0">Loading users...</div>}
      {error && <div className="alert alert-danger mb-0">{error}</div>}

      {!loading && !error && (
        <ul className="list-group list-group-flush border rounded">
          {users.length === 0 ? (
            <li className="list-group-item text-center text-secondary py-4">No users found.</li>
          ) : (
            users.map((user, index) => (
              <li
                key={user._id || user.id || index}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between gap-1"
              >
                <span className="fw-medium">{user.username || user.name || 'Unknown user'}</span>
                <span className="text-secondary">{user.email || '-'}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}

export default Users;
