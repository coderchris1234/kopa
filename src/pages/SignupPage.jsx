import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '../components/ui';
import AuthLayout from '../components/features/auth/AuthLayout';
import { useAuth } from '../hooks';
import { isValidEmail, validatePassword, validateRequired } from '../utils';
import styles from '../components/features/auth/AuthLayout.module.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameError = validateRequired(formData.name, 'Full name');
    if (nameError) newErrors.name = nameError;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      // Navigate to onboarding after successful signup
      navigate('/onboarding');
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create your account</h2>
        <p className={styles.formSubtitle}>
          Start receiving support from your audience in minutes
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Full name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Christobel Nwachukwu"
          error={errors.name}
          required
          disabled={loading}
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
          required
          disabled={loading}
        />

        <div className={styles.passwordWrapper}>
          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            error={errors.password}
            helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
            required
            disabled={loading}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {errors.submit && (
          <div style={{ 
            padding: 'var(--space-3)', 
            backgroundColor: 'var(--error-light)', 
            color: 'var(--error)', 
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-sm)'
          }}>
            {errors.submit}
          </div>
        )}

        <Button 
          type="submit" 
          size="lg" 
          fullWidth 
          loading={loading}
        >
          Create account
        </Button>
      </form>

      <div className={styles.footer}>
        Already have an account?{' '}
        <Link to="/login" className={styles.footerLink}>
          Sign in
        </Link>
      </div>

      <div style={{ 
        marginTop: 'var(--space-6)', 
        fontSize: 'var(--text-xs)', 
        color: 'var(--text-tertiary)', 
        textAlign: 'center',
        lineHeight: 'var(--leading-relaxed)'
      }}>
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </div>
    </AuthLayout>
  );
}
