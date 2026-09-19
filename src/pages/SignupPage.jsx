import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { HiUserAdd } from 'react-icons/hi';
import { useCreateAccount } from '../hooks/useApi';
import { isValidEmail, validatePassword } from '../utils';
import styles from './SignupPage.module.css';

export default function SignupPage() {
  const { mutate: createAccount, isPending, error: apiError } = useCreateAccount();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (formData.password !== formData.confirm) {
      newErrors.confirm = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    createAccount(formData, {
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to create account. Please try again.';
        setErrors({ submit: errorMessage });
      }
    });
  };

  const handleGoogleSignup = () => {
    // Google OAuth logic here
    console.log('Google signup');
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Image */}
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="KOPA" className={styles.logo} />
          <span className={styles.logoText}>KOPA</span>
        </div>
        <img src="/create-image.jpg" alt="Creator" className={styles.heroImage} />
      </div>

      {/* Right Side - Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.iconWrapper}>
              <HiUserAdd className={styles.formIcon} />
            </div>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={styles.input}
                  disabled={isPending}
                  required
                />
              </div>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.input}
                  disabled={isPending}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.input}
                  disabled={isPending}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm && <span className={styles.error}>{errors.confirm}</span>}
            </div>

            {errors.submit && (
              <div className={styles.submitError}>{errors.submit}</div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending}
            >
              {isPending ? 'Creating account...' : 'Create account'}
            </button>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleSignup}
              disabled={isPending}
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{' '}
            <Link to="/login" className={styles.link}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
