"use client"
import { useState } from 'react';
import styles from './login.module.css';
import { login } from '../_app/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const validateForm = () => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Username is required.');
      valid = false;
    } else if (username.length < 4) {
      setUsernameError('Username must be at least 4 characters.');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsWaiting(true);
    try {
      const res = await login(
        {
          "username": username,
          "password": password
        }
      );
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username)
      router.push('/dashboard')
    } catch (err) {
      alert(err.response.data.message);

    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError('');
            }}
            className={`${styles.input} ${usernameError ? styles.inputError : ''}`}
          />
          {usernameError && <p className={styles.error}>{usernameError}</p>}

          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
            }}
            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <button type="submit" className={styles.button}>
            {
              isWaiting ? <div className="loader"></div> : "Sign In"
            }
          </button>
        </form>
        <p className={styles.footer}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
