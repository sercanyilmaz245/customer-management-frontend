"use client"
import { useState } from 'react';
import {
  updatePassword
} from '../../_app/auth';
import styles from '../dashboard.module.css';

function TopMenu({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handlePasswordUpdate = async () => {
    // Validate
    const newErrors = {};
    if (!passwordForm.oldPassword) {
      newErrors.oldPassword = 'Old password is required.';
    } else if (passwordForm.oldPassword.length < 4) {
      newErrors.oldPassword = 'Old password must be at least 4 characters.';
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (passwordForm.newPassword.length < 4) {
      newErrors.newPassword = 'New password must be at least 4 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If valid, submit
    const form = {
      username: localStorage.getItem("username"),
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    };
    try {
      await updatePassword(form);
      alert('Password updated!');
      setShowPasswordPopup(false);
      setPasswordForm({ oldPassword: '', newPassword: '' });
      setErrors({ oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  const handleChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    // Clear error for this field on change
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div style={{ position: 'relative', textAlign: 'right', padding: '10px' }}>
      {/* Icon Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
        }}
      >
        &#9776;
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div style={{
          position: 'absolute',
          right: 10,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '6px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          zIndex: 10,
        }}>
          <div
            onClick={() => {
              setShowPasswordPopup(true);
              setShowDropdown(false);
            }}
            style={{ padding: '10px', cursor: 'pointer', minWidth: 'max-content' }}
          >
            Update Password
          </div>
          <div
            onClick={onLogout}
            style={{ padding: '10px', cursor: 'pointer', borderTop: '1px solid #eee', color: 'red' }}
          >
            Logout
          </div>
        </div>
      )}

      {/* Password Popup + Overlay */}
      {showPasswordPopup && (
        <>
          {/* Black semi-transparent overlay */}
          <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 15
          }} />

          {/* Popup */}
          <div style={{
            position: 'fixed',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -30%)',
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            zIndex: 20,
            width: '300px'
          }}>
            < h3 style = {{ textAlign: 'center'}}>Update Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={passwordForm.oldPassword}
              onChange={(e) => handleChange('oldPassword', e.target.value)}
              style={{ marginBottom: '4px', display: 'block', width: '100%' }}
            />
            {errors.oldPassword && (
              <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>
                {errors.oldPassword}
              </div>
            )}

            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              style={{ marginBottom: '4px', display: 'block', width: '100%' }}
            />
            {errors.newPassword && (
              <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>
                {errors.newPassword}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <button className={styles.saveButton} onClick={handlePasswordUpdate}>Update</button>
              <button className={styles.closeButton} onClick={() => setShowPasswordPopup(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopMenu;