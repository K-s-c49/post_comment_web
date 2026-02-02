import { useState } from 'react';
import { api, getToken } from '../lib/api';

export default function AuthBar({ onAuthChange }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const token = getToken();

  async function onSubmit(e) {
    e.preventDefault();

    const u = username.trim();
    const p = password;
    if (!u || !p) return;

    try {
      setError('');
      if (mode === 'register') {
        await api.register({ username: u, password: p });
      } else {
        await api.login({ username: u, password: p });
      }

      setPassword('');
      onAuthChange?.();
    } catch (e2) {
      setError(e2.message || 'Auth failed');
    }
  }

  function onLogout() {
    api.logout();
    onAuthChange?.();
  }

  if (token) {
    return (
      <div className="authRow">
        <div className="muted">Signed in</div>
        <button className="btn btnGhost" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="authRow">
        <div className="authTabs">
          <button
            className={mode === 'login' ? 'btn' : 'btn btnGhost'}
            type="button"
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'register' ? 'btn' : 'btn btnGhost'}
            type="button"
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>
      </div>

      {error ? <div className="alert">{error}</div> : null}

      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={100}
        />
        <button className="btn" type="submit">
          {mode === 'register' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="muted" style={{ marginTop: 8 }}>
        Create posts/comments requires login.
      </div>
    </div>
  );
}
