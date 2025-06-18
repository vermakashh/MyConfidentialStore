import React, { useEffect, useState } from 'react';
import './styles/authModal.css';
import { X } from 'lucide-react';

const AuthModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShowModal(false);
  const handleToggle = () => setIsLogin((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? 'Login' : 'Signup'} functionality to be implemented`);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="form-container">
            <div className="form-toggle">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={handleToggle}
              >
                Sign Up
              </button>
              <button className="close-btn" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <form className={`form ${isLogin ? 'active' : ''}`} onSubmit={handleSubmit}>
              {isLogin ? (
                <>
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <button type="submit">Login</button>
                  <p className="forgot-password">Forgot Password?</p>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email" required />
                  <input type="password" placeholder="Password" required />
                  <input type="password" placeholder="Confirm Password" required />
                  <button type="submit">Sign Up</button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
