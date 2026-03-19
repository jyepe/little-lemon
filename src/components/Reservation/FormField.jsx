import "./FormField.css";

function FormField({ id, label, type = "text", value, onChange, required, autoComplete, placeholder, rows, options, hint, error }) {
    const errorId = `${id}-error`;
    const renderControl = () => {
        if (type === "textarea") {
            return (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            );
        }

        if (type === "select") {
            return (
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    aria-required={required ? "true" : undefined}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                aria-required={required ? "true" : undefined}
                aria-invalid={error ? "true" : undefined}
                aria-describedby={error ? errorId : undefined}
                autoComplete={autoComplete}
            />
        );
    };

    return (
        <div className={`form-field${error ? " form-field--error" : ""}`}>
            <label htmlFor={id}>{label}</label>
            {renderControl()}
            {error && <p className="form-field__error" id={errorId} role="alert">{error}</p>}
            {hint && !error && <p className="form-field__hint">{hint}</p>}
        </div>
    );
}

export default FormField;
