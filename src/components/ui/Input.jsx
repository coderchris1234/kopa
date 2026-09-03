import styles from './Input.module.css';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  prefix,
  suffix,
  className = '',
  ...props
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${styles.input} ${error ? styles.error : ''} ${prefix ? styles.withPrefix : ''} ${suffix ? styles.withSuffix : ''}`}
          {...props}
        />
        
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      
      {helpText && !error && (
        <span className={styles.helpText}>{helpText}</span>
      )}
      
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`${styles.input} ${styles.textarea} ${error ? styles.error : ''}`}
        {...props}
      />
      
      {helpText && !error && (
        <span className={styles.helpText}>{helpText}</span>
      )}
      
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
}
