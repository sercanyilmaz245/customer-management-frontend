"use client";
import { useState } from 'react';
import styles from './register.module.css';
import { register } from '../_app/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsWaiting(true);
      await register({ username, password });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push('/login');
      }, 3000);
    } catch (err) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleRegister} className={styles.form}>
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

          <button type="submit" className={styles.button} disabled={isWaiting}>
            {isWaiting ? <div className="loader"></div> : "Register"}
          </button>
        </form>

        {showAlert && (
          <div className={styles.registerSuccess}>
            Registered successfully! Redirecting to login...
          </div>
        )}

        <p className={styles.footer}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
