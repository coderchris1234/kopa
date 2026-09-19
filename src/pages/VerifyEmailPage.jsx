import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { useVerifyAccount } from '../hooks/useApi';
import styles from './VerifyEmailPage.module.css';

export default function VerifyEmailPage() {
  const { mutate: verifyAccount, isPending } = useVerifyAccount();
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get the email from localStorage
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.match(/\d/g) || [];
    
    const newCode = [...verificationCode];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setVerificationCode(newCode);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = verificationCode.join('');
    
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');

    verifyAccount({ email, otp }, {
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Invalid verification code. Please try again.';
        setError(errorMessage);
      }
    });
  };

  const handleResend = async () => {
    // TODO: Implement resend OTP API call
    alert('Resend OTP functionality will be implemented');
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Image */}
      <div className={styles.leftSide}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="KOPA" className={styles.logo} />
          <span className={styles.logoText}>KOPA</span>
        </div>
        <img src="/verify-email.jpg" alt="Verify email" className={styles.heroImage} />
      </div>

      {/* Right Side - Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.iconWrapper}>
              <MdEmail className={styles.formIcon} />
            </div>
            <h1 className={styles.title}>Verify your email</h1>
            <p className={styles.subtitle}>
              A verification code has been sent to <strong>{email}</strong>. Please enter it to continue.
            </p>
          </div>

          <form onSubmit={handleVerify} className={styles.form}>
            <div className={styles.codeInputGroup}>
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={styles.codeInput}
                  disabled={isPending}
                  required
                />
              ))}
            </div>

            {error && (
              <div className={styles.error}>{error}</div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending || verificationCode.some(d => !d)}
            >
              {isPending ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          <p className={styles.footer}>
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              className={styles.link}
              disabled={isPending}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
