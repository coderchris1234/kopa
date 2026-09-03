import styles from './Select.module.css';

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
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
      
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={styles.select}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && !error && (
        <span className={styles.helpText}>{helpText}</span>
      )}
      
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
}
